#![cfg_attr(not(feature = "std"), no_std, no_main)]
// commenting this out because otherwise I get an error
// #![feature(min_specialization)]

#[openbrush::implementation(Ownable, PSP34, PSP34Burnable, PSP34Enumerable, PSP34Metadata)]
#[openbrush::contract]
pub mod collection {
    use openbrush::{
        contracts::psp34::{extensions::metadata, PSP34Impl},
        traits::{Storage, String},
    };
    //use payable_mint_pkg::traits::payable_mint::*;

    use ink::codegen::{EmitEvent, Env};
    use payable_mint_pkg::impls::payable_mint;
    use payable_mint_pkg::impls::payable_mint::types;

    /// Collection struct serves as the main contract storage.
    #[ink(storage)]
    #[derive(Default, Storage)]
    pub struct Collection {
        #[storage_field]
        psp34: psp34::Data,
        #[storage_field]
        ownable: ownable::Data,
        #[storage_field]
        metadata: metadata::Data,
        #[storage_field]
        enumerable: enumerable::Data,
        #[storage_field]
        payable_mint: types::Data,
    }
    
    /// Event emitted when a token transfer occurs.
    #[ink(event)]
    pub struct Transfer {
        #[ink(topic)]
        from: Option<AccountId>,
        #[ink(topic)]
        to: Option<AccountId>,
        #[ink(topic)]
        id: Id,
    }

    /// Event emitted when a token is approved.
    #[ink(event)]
    pub struct Approval {
        #[ink(topic)]
        from: AccountId,
        #[ink(topic)]
        to: AccountId,
        #[ink(topic)]
        id: Option<Id>,
        approved: bool,
    }

    /// Helper function to emit a Transfer event.
    #[overrider(psp34::Internal)]
    fn _emit_transfer_event(&self, from: Option<AccountId>, to: Option<AccountId>, id: Id) {
        self.env().emit_event(Transfer { from, to, id });
    }

    /// Helper function to emit an Approval event.
    #[overrider(psp34::Internal)]
    fn _emit_approval_event(&self, from: AccountId, to: AccountId, id: Option<Id>, approved: bool) {
        self.env().emit_event(Approval {
            from,
            to,
            id,
            approved,
        });
    }

    // Implementation of the PayableMint trait for Collection.
    impl payable_mint::payable_mint::PayableMintImpl for Collection {}

    /// Implementation of the Internal trait for Collection.
    impl payable_mint::payable_mint::Internal for Collection {}

    impl Collection {
        /// Constructor function for Collection.
        ///
        /// Initializes a new Collection with the provided parameters.
        #[ink(constructor)]
        pub fn new(
            name: String,
            symbol: String,
            base_uri: String,
            max_supply: u64,
            price_per_mint: Balance,
        ) -> Self {
            // Initialize the default state for the Collection contract.
            let mut instance = Self::default();

            // Fetch the account ID of the contract caller.
            let caller = Self::env().caller();

            // Set the initial owner of the contract to be the caller.
            ownable::Internal::_init_with_owner(&mut instance, caller);

            // Get the unique identifier for the collection.
            let collection_id = PSP34Impl::collection_id(&instance);

            // Set the "name" attribute for the collection.
            metadata::Internal::_set_attribute(
                &mut instance,
                collection_id.clone(),
                String::from("name"),
                name,
            );

            // Set the "symbol" attribute for the collection.
            metadata::Internal::_set_attribute(
                &mut instance,
                collection_id.clone(),
                String::from("symbol"),
                symbol,
            );

            // Set the "baseUri" attribute for the collection.
            metadata::Internal::_set_attribute(
                &mut instance,
                collection_id,
                String::from("baseUri"),
                base_uri,
            );

            // Set the max supply for the tokens.
            instance.payable_mint.max_supply = max_supply;
            
            // Set the price for minting a token.
            instance.payable_mint.price_per_mint = price_per_mint;

            // Initialize the last token ID as 0.
            instance.payable_mint.last_token_id = 0;

            // Set the maximum amount of tokens that can be minted at once.
            instance.payable_mint.max_amount = 1;
    
            // Return the initialized instance of the Collection contract.
            instance
        }
    }

    /// Test module for the `Collection` contract.
    #[cfg(test)]
    mod tests {
        use crate::collection::Collection;
        use ink::env::test;
        use openbrush::contracts::traits::errors::PSP34Error::*;
        use payable_mint_pkg::impls::payable_mint::types::NFTAttributes;
        use openbrush::{
            contracts::psp34::{extensions::enumerable::*, extensions::metadata, PSP34Impl},
            traits::{AccountId, Balance, String},
        };
        //use payable_mint_pkg::impls::payable_mint;
        use payable_mint_pkg::impls::payable_mint::payable_mint::PayableMintImpl;
        //use payable_mint_pkg::impls::payable_mint::types;

        // Constants used for tests.
        const PRICE: Balance = 100_000_000_000_000_000;
        const BASE_URI: &str = "ipfs://myIpfsUri/";
        const MAX_SUPPLY: u64 = 10;

        /// Initializes a new `Collection` instance with test data.
        fn init() -> Collection {
            Collection::new(
                String::from("Women of Polkadot"),
                String::from("WMN"),
                String::from(BASE_URI),
                MAX_SUPPLY,
                PRICE,
            )
        }

        /// Tests the initialization of the `Collection` contract.
        #[ink::test]
        fn init_works() {
            let collection = init();
            let collection_id = PSP34Impl::collection_id(&collection);
            assert_eq!(
                metadata::PSP34MetadataImpl::get_attribute(
                    &collection,
                    collection_id.clone(),
                    String::from("name")
                ),
                Some(String::from("Women of Polkadot"))
            );
            assert_eq!(
                metadata::PSP34MetadataImpl::get_attribute(
                    &collection,
                    collection_id.clone(),
                    String::from("symbol")
                ),
                Some(String::from("WMN"))
            );
            assert_eq!(
                metadata::PSP34MetadataImpl::get_attribute(
                    &collection,
                    collection_id,
                    String::from("baseUri")
                ),
                Some(String::from(BASE_URI))
            );
            assert_eq!(collection.max_supply(), MAX_SUPPLY);
            assert_eq!(collection.price(), PRICE);
        }

        /// Tests minting a single PSP34.
        #[ink::test]
        fn mint_single_works() {
            let mut collection = init();
            let accounts = test::default_accounts::<ink::env::DefaultEnvironment>();
            set_sender(accounts.bob);

            assert_eq!(PSP34Impl::total_supply(&collection), 0);
            test::set_value_transferred::<ink::env::DefaultEnvironment>(PRICE);
            assert!(collection.mint(accounts.bob, 1).is_ok());
            assert_eq!(PSP34Impl::total_supply(&collection), 1);
            assert_eq!(
                PSP34Impl::owner_of(&collection, Id::U64(1)),
                Some(accounts.bob)
            );
            assert_eq!(PSP34Impl::balance_of(&collection, accounts.bob), 1);

            assert_eq!(
                PSP34EnumerableImpl::owners_token_by_index(&collection, accounts.bob, 0),
                Ok(Id::U64(1))
            );
            assert_eq!(1, ink::env::test::recorded_events().count());
        }

        // Tests minting multiple PSP34.
        // #[ink::test]
        // fn mint_multiple_works() {
        //     let accounts = test::default_accounts::<ink::env::DefaultEnvironment>();
        //     set_sender(accounts.bob);
        //     let mut collection = init();
        //     let num_of_mints: u64 = 5;

        //     assert!(collection.set_max_mint_amount(num_of_mints).is_ok());

        //     assert_eq!(PSP34Impl::total_supply(&collection), 0);

        //     test::set_value_transferred::<ink::env::DefaultEnvironment>(PRICE * num_of_mints as u128);
        //     assert!(PayableMintImpl::mint(&mut collection, accounts.bob, num_of_mints).is_ok());
        //     assert_eq!(PSP34Impl::total_supply(&collection), num_of_mints as u128);
        //     assert_eq!(PSP34Impl::balance_of(&collection, accounts.bob), 5);
        //     assert_eq!(
        //         PSP34EnumerableImpl::owners_token_by_index(&collection, accounts.bob, 0),
        //         Ok(Id::U64(1))
        //     );
        //     assert_eq!(
        //         PSP34EnumerableImpl::owners_token_by_index(&collection, accounts.bob, 1),
        //         Ok(Id::U64(2))
        //     );
        //     assert_eq!(
        //         PSP34EnumerableImpl::owners_token_by_index(&collection, accounts.bob, 2),
        //         Ok(Id::U64(3))
        //     );
        //     assert_eq!(
        //         PSP34EnumerableImpl::owners_token_by_index(&collection, accounts.bob, 3),
        //         Ok(Id::U64(4))
        //     );
        //     assert_eq!(
        //         PSP34EnumerableImpl::owners_token_by_index(&collection, accounts.bob, 4),
        //         Ok(Id::U64(5))
        //     );
        //     assert_eq!(
        //         PSP34EnumerableImpl::owners_token_by_index(&collection, accounts.bob, 5),
        //         Err(TokenNotExists)
        //     );
        //     assert_eq!(5, ink::env::test::recorded_events().count());
        // }

        /// Utility function to set the sender for test transactions.
        fn set_sender(sender: AccountId) {
            ink::env::test::set_caller::<ink::env::DefaultEnvironment>(sender);
        }
    }

}
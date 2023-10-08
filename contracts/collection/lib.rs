#![cfg_attr(not(feature = "std"), no_std, no_main)]
#![feature(min_specialization)]

#[openbrush::implementation(
    Ownable,
    PSP34,
    PSP34Burnable,
    PSP34Mintable,
    PSP34Enumerable,
    PSP34Metadata
)]
#[openbrush::contract]
pub mod collection {
    use openbrush::{
        contracts::psp34::{extensions::metadata, PSP34Impl},
        modifiers,
        traits::{Storage, String},
    };
    use payable_mint_pkg::impls::payable_mint;
    use payable_mint_pkg::impls::payable_mint::types;

    #[ink(storage)]
    #[derive(Default, Storage)]
    pub struct Collection {
        #[storage_field]
        psp34: psp34::Data,
        next_id: u8,
        #[storage_field]
        ownable: ownable::Data,
        #[storage_field]
        metadata: metadata::Data,
        #[storage_field]
        enumerable: enumerable::Data,
        #[storage_field]
        payable_mint: types::Data,
    }

    impl payable_mint::payable_mint::PayableMintImpl for Collection {}
    impl payable_mint::payable_mint::Internal for Collection {}

    impl Collection {
        #[ink(constructor)]
        pub fn new(
            name: String,
            symbol: String,
            base_uri: String,
            max_supply: u64,
            price_per_mint: Balance,
        ) -> Self {
            let mut instance = Self::default();
            let caller = Self::env().caller();
            ownable::Internal::_init_with_owner(&mut instance, caller);
            let collection_id = PSP34Impl::collection_id(&instance);
            metadata::Internal::_set_attribute(
                &mut instance,
                collection_id.clone(),
                String::from("name"),
                name,
            );
            metadata::Internal::_set_attribute(
                &mut instance,
                collection_id.clone(),
                String::from("symbol"),
                symbol,
            );
            metadata::Internal::_set_attribute(
                &mut instance,
                collection_id,
                String::from("baseUri"),
                base_uri,
            );
            instance.payable_mint.max_supply = max_supply;
            instance.payable_mint.price_per_mint = price_per_mint;
            instance.payable_mint.last_token_id = 0;
            instance
        }

        #[ink(message)]
        #[modifiers(only_owner)]
        pub fn mint_token(&mut self) -> Result<(), PSP34Error> {
            psp34::Internal::_mint_to(self, Self::env().caller(), Id::U8(self.next_id))?;
            self.next_id += 1;
            Ok(())
        }
    }
}

#[cfg(test)]
#[cfg(test)]
mod tests {
    use super::*;
    use crate::collection::Collection;
    use ink::env::test;
    use openbrush::contracts::traits::errors::PSP34Error::*;
    use openbrush::{
        contracts::psp34::{extensions::enumerable::*, extensions::metadata, PSP34Impl},
        modifiers,
        traits::{AccountId, Balance, Storage, String},
    };
    use payable_mint_pkg::impls::payable_mint::*;

    const PRICE: Balance = 100_000_000_000_000_000;
    fn init() -> Collection {
        const BASE_URI: &str = "ipfs://myIpfsUri/";
        const MAX_SUPPLY: u64 = 10;
        Collection::new(
            String::from("Collection"),
            String::from("WMN"),
            String::from(BASE_URI),
            MAX_SUPPLY,
            PRICE,
        )
    }

    #[ink::test]
    fn mint_multiple_works() {
        let mut collection = init();
        let accounts = test::default_accounts::<ink::env::DefaultEnvironment>();
        set_sender(accounts.bob);
        let num_of_mints: u64 = 5;

        assert_eq!(PSP34Impl::total_supply(&collection), 0);
        test::set_value_transferred::<ink::env::DefaultEnvironment>(PRICE * num_of_mints as u128);
        assert!(
            payable_mint::PayableMintImpl::mint(&mut collection, accounts.bob, num_of_mints)
                .is_ok()
        );
        assert_eq!(PSP34Impl::total_supply(&collection), num_of_mints as u128);
        assert_eq!(PSP34Impl::balance_of(&collection, accounts.bob), 5);
        assert_eq!(
            PSP34EnumerableImpl::owners_token_by_index(&collection, accounts.bob, 0),
            Ok(Id::U64(1))
        );
        assert_eq!(
            PSP34EnumerableImpl::owners_token_by_index(&collection, accounts.bob, 1),
            Ok(Id::U64(2))
        );
        assert_eq!(
            PSP34EnumerableImpl::owners_token_by_index(&collection, accounts.bob, 2),
            Ok(Id::U64(3))
        );
        assert_eq!(
            PSP34EnumerableImpl::owners_token_by_index(&collection, accounts.bob, 3),
            Ok(Id::U64(4))
        );
        assert_eq!(
            PSP34EnumerableImpl::owners_token_by_index(&collection, accounts.bob, 4),
            Ok(Id::U64(5))
        );
        assert_eq!(
            PSP34EnumerableImpl::owners_token_by_index(&collection, accounts.bob, 5),
            Err(TokenNotExists)
        );
    }

    fn set_sender(sender: AccountId) {
        ink::env::test::set_caller::<ink::env::DefaultEnvironment>(sender);
    }
}

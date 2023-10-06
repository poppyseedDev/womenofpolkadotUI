#![cfg_attr(not(feature = "std"), no_std, no_main)]

#[openbrush::implementation(
    Ownable,
    PSP34,
    PSP34Mintable,
    PSP34Burnable,
    PSP34Enumerable,
    PSP34Metadata
)]
#[openbrush::contract]
pub mod collection {
    use openbrush::{
        contracts::psp34::{extensions::metadata, PSP34Impl},
        modifiers,
        traits::Storage,
    };

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
    }

    impl Collection {
        #[ink(constructor)]
        pub fn new(name: String, symbol: String, base_uri: String) -> Self {
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
            instance
        }

        #[ink(message)]
        #[modifiers(only_owner)]
        pub fn mint_token(&mut self) -> Result<(), PSP34Error> {
            psp34::Internal::_mint_to(self, Self::env().caller(), Id::U8(self.next_id))?;
            self.next_id += 1;
            Ok(())
        }

        #[ink(message)]
        #[modifiers(only_owner)]
        pub fn mint(&mut self, id: Id) -> Result<(), PSP34Error> {
            psp34::Internal::_mint_to(self, Self::env().caller(), id)
        }
    }
}

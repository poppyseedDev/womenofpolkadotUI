use crate::impls::payable_mint::types::{Data, NFTAttributes};
//use crate::traits::payable_mint;
//pub use crate::traits::payable_mint::PayableMint;

use ink::metadata::layout::HashingStrategy;
use ink::prelude::string::{ToString};
use openbrush::contracts::psp34::extensions::metadata;
use openbrush::{
    contracts::{ownable::*, psp34::*},
    modifiers,
    traits::{AccountId, Balance, Storage, String},
};

#[openbrush::trait_definition]
pub trait PayableMintImpl:
    Storage<Data>
    + Storage<psp34::Data>
    + Storage<ownable::Data>
    + Storage<metadata::Data>
    + Internal
    + psp34::InternalImpl
    + PSP34Impl
    + metadata::Internal
    + metadata::PSP34MetadataImpl
{
    #[ink(message, payable)]
    fn mint(
        &mut self, 
        to: AccountId, 
        background: u8,
        skin: u8,
        eyes: u8,
        lips: u8,
        hair: u8,
        clothes: u8,
        hat: u8,
        accessories: u8,
        extra: u8,
    ) -> Result<(), PSP34Error> {
        self.check_value(Self::env().transferred_value(), 1)?;
        self.check_amount(1)?;

        let attrs = NFTAttributes {
            background,
            skin,
            eyes,
            lips,
            hair,
            clothes,
            hat,
            accessories,
            extra
        };

        let next_to_mint = self.data::<Data>().last_token_id + 1; // first mint id is 1

        psp34::InternalImpl::_mint_to(self, to, Id::U64(next_to_mint))?;
        self.data::<Data>().last_token_id += 1;

        // Store the attributes for the minted token.
        self.data::<Data>().token_attributes.insert(&Id::U64(next_to_mint), &attrs);


        Ok(())
    }

    /// Withdraws funds to contract owner
    #[ink(message)]
    #[modifiers(only_owner)]
    fn withdraw(&mut self) -> Result<(), PSP34Error> {
        let balance = Self::env().balance();
        let current_balance = balance
            .checked_sub(Self::env().minimum_balance())
            .unwrap_or_default();
        let owner = self.data::<ownable::Data>().owner.get().unwrap().unwrap();
        Self::env()
            .transfer(owner, current_balance)
            .map_err(|_| PSP34Error::Custom(String::from("WithdrawalFailed")))?;
        Ok(())
    }

    /// Set new value for the baseUri
    #[ink(message)]
    #[openbrush::modifiers(only_owner)]
    fn set_base_uri(&mut self, uri: String) -> Result<(), PSP34Error> {
        let id = PSP34Impl::collection_id(self);
        metadata::Internal::_set_attribute(self, id, String::from("baseUri"), uri);

        Ok(())
    }

    /// Set max number of tokens which could be minted per call
    #[ink(message)]
    #[modifiers(only_owner)]
    fn set_max_mint_amount(&mut self, max_amount: u64) -> Result<(), PSP34Error> {
        self.data::<Data>().max_amount = max_amount;

        Ok(())
    }

    /// Get URI from token ID
    #[ink(message)]
    fn token_uri(&self, token_id: u64) -> Result<String, PSP34Error> {
        self.token_exists(Id::U64(token_id))?;
        let base_uri = metadata::PSP34MetadataImpl::get_attribute(
            self,
            PSP34Impl::collection_id(self),
            String::from("baseUri"),
        );
        let token_uri = base_uri.unwrap() + &token_id.to_string() + &String::from(".json");
        Ok(token_uri)
    }

    /// Get max supply of tokens
    #[ink(message)]
    fn max_supply(&self) -> u64 {
        self.data::<Data>().max_supply
    }

    /// Get token price
    #[ink(message)]
    fn price(&self) -> Balance {
        self.data::<Data>().price_per_mint
    }

    /// Get max number of tokens which could be minted per call
    #[ink(message)]
    fn get_max_mint_amount(&mut self) -> u64 {
        self.data::<Data>().max_amount
    }
}

pub trait Internal: Storage<Data> + psp34::Internal {
    /// Check if the transferred mint values is as expected
    fn check_value(&self, transferred_value: u128, mint_amount: u64) -> Result<(), PSP34Error> {
        if let Some(value) = (mint_amount as u128).checked_mul(self.data::<Data>().price_per_mint) {
            if transferred_value == value {
                return Ok(());
            }
        }
        return Err(PSP34Error::Custom(String::from("BadMintValue")));
    }

    /// Check amount of tokens to be minted
    fn check_amount(&self, mint_amount: u64) -> Result<(), PSP34Error> {
        if mint_amount == 0 {
            return Err(PSP34Error::Custom(String::from("CannotMintZeroTokens")));
        }
        if mint_amount > self.data::<Data>().max_amount {
            return Err(PSP34Error::Custom(String::from("TooManyTokensToMint")));
        }
        if let Some(amount) = self.data::<Data>().last_token_id.checked_add(mint_amount) {
            if amount <= self.data::<Data>().max_supply {
                return Ok(());
            }
        }
        return Err(PSP34Error::Custom(String::from("CollectionIsFull")));
    }

    // Check if token is minted
    fn token_exists(&self, id: Id) -> Result<(), PSP34Error> {
        self._owner_of(&id).ok_or(PSP34Error::TokenNotExists)?;
        Ok(())
    }
}

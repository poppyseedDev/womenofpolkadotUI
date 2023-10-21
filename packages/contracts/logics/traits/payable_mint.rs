use ink::prelude::string::String as PreludeString;
use openbrush::{
    contracts::psp34::PSP34Error,
    traits::{AccountId, Balance},
};
use crate::impls::payable_mint::types::NFTAttributes;


#[openbrush::wrapper]
pub type PayableMintRef = dyn PayableMint;

#[openbrush::trait_definition]
pub trait PayableMint {
    #[ink(message, payable)]
    fn mint(&mut self, to: AccountId, attributes: NFTAttributes) -> Result<(), PSP34Error>;
    #[ink(message)]
    fn withdraw(&mut self) -> Result<(), PSP34Error>;
    #[ink(message)]
    fn set_base_uri(&mut self, uri: PreludeString) -> Result<(), PSP34Error>;
    #[ink(message)]
    fn token_uri(&mut self, token_id: u64) -> Result<(), PSP34Error>;
    #[ink(message)]
    fn max_supply(&mut self) -> u64;
    #[ink(message)]
    fn price(&mut self) -> Balance;
    /// Set max number of tokens which could be minted per call
    #[ink(message)]
    fn set_max_mint_amount(&mut self, max_amount: u64) -> Result<(), PSP34Error>;
    /// Get max number of tokens which could be minted per call
    #[ink(message)]
    fn get_max_mint_amount(&mut self) -> u64;
}

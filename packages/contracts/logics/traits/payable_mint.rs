use ink::prelude::string::String as PreludeString;
use openbrush::{
    contracts::psp34::PSP34Error,
    traits::{AccountId, Balance},
};

#[openbrush::wrapper]
pub type PayableMintRef = dyn PayableMint;

#[openbrush::trait_definition]
pub trait PayableMint {
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
        extra: u8,) -> Result<(), PSP34Error>;
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

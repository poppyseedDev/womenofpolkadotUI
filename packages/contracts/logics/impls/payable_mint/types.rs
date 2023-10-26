use ink::storage::Mapping;
use openbrush::{
    contracts::psp34::Id,
    traits::{Balance, String},
};

/// NFT attributes structure.
#[derive(Clone, Default, Debug, scale::Encode, scale::Decode)]
#[cfg_attr(
    feature = "std",
    derive(scale_info::TypeInfo, ink::storage::traits::StorageLayout)
)]
pub struct NFTAttributes {
    pub background: u8,
    pub skin: u8,
    pub eyes: u8,
    pub lips: u8,
    pub hair: u8,
    pub clothes: u8,
    pub hat: u8,
    pub accessories: u8,
    pub extra: u8,
}

#[derive(Default, Debug)]
#[openbrush::storage_item]
pub struct Data {
    pub last_token_id: u64,
    pub max_supply: u64,
    pub price_per_mint: Balance,
    pub collection_id: u32,
    pub max_amount: u64,
    pub token_attributes: Mapping<Id, NFTAttributes>,
    pub ipfs_string: Mapping<Id, String>,
}

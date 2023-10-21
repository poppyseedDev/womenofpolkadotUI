use ink::storage::{traits::StorageLayout, Mapping};
use openbrush::{traits::Balance, contracts::psp34::Id};
use scale_info::TypeInfo;

/// NFT attributes structure.
#[derive(Clone, Default, Debug, scale::Encode, scale::Decode, TypeInfo, StorageLayout)]
pub struct NFTAttributes {
    background: u8,
    skin: u8,
    eyes: u8,
    lips: u8,
    hair: u8,
    clothes: u8,
    hat: u8,
    accessories: u8,
    extra: u8,
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
}

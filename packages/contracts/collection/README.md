# Collection Contract

This smart contract is designed for the Polkadot/Substrate ecosystem using the `ink!` smart contract language. It provides an implementation of a collection contract with various features, including:

- Token creation (minting) with payment.
- Token enumeration.
- Token metadata.
- Ownership management.

## Features

### Basic Token Implementation

This contract follows the `PSP34` standard, which is an equivalent to the ERC-721 standard in Ethereum, for non-fungible tokens.

### Events

- **Transfer**: Emitted when a token transfer occurs.
- **Approval**: Emitted when a token gets approved.

### Extensions

- **Burnable**: Provides capabilities to burn tokens.
- **Enumerable**: Offers an enumeration over all tokens and tokens of a specific owner.
- **Metadata**: Offers a way to provide additional information for tokens, e.g., name, symbol, and base URI.

### Payable Mint

This contract allows users to mint tokens by paying a specified amount.

## Usage

### Initialization

You can initialize the contract with a name, symbol, base URI, maximum supply, and price per mint.

```rust
Collection::new(
    String::from("Women from Polkadot Collection"),
    String::from("WMN"),
    String::from("ipfs://myIpfsUri/"),
    10,
    100_000_000_000_000_000
)
```

### Minting

Tokens can be minted by users by sending the required amount.

```rust
test::set_value_transferred::<ink::env::DefaultEnvironment>(PRICE);
collection.mint(accounts.bob, 1);
```

## Tests

The contract also provides a suite of tests to ensure its correctness.

- **init_works**: Tests that the contract initializes correctly.
- **mint_single_works**: Tests that a single token can be minted.
- **mint_multiple_works**: Tests that multiple tokens can be minted at once.

## Dependencies

This contract relies on several external packages and traits including:

- `openbrush`
- `ink`
- `payable_mint_pkg`


## Contributing

If you have suggestions for improvements, or discover bugs, please open an issue or pull request.

# Getting Started

## Ink! Environment Setup 

**Rust and Cargo**
```bash
curl https://sh.rustup.rs -sSf | sh
source ~/.cargo/env

rustup default stable
rustup update
rustup update nightly
rustup component add rust-src
rustup component add rust-src --toolchain nightly
rustup target add wasm32-unknown-unknown --toolchain nightly
```

**Ink! CLI**

```bash
brew install binaryen
cargo install cargo-dylint dylint-link
cargo install cargo-contract --force --locked
```
Using `cargo-contract 3.2.0`



**Deploying using `cargo-contract`**
```bash
cd collection
cargo contract build --release
cargo contract upload --suri //Alice
cargo contract instantiate --suri //Alice --args "Women of Polkadot" "WMN" "ipfs://myIpfsUri/" 10 100_000
```
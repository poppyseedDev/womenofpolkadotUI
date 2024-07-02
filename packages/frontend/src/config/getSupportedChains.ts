/**
 * Returns the supported chains from the environment variables.
 * If the environment variable is not set, it returns the default chain.
 */
export const getSupportedChains = (): string[] => {
  const defaultChain = 'alephzero-testnet'
  const parsedChains =
    !!process.env.NEXT_PUBLIC_SUPPORTED_CHAINS &&
    JSON.parse(process.env.NEXT_PUBLIC_SUPPORTED_CHAINS)
  return parsedChains || [defaultChain]
}

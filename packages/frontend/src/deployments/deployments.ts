import { env } from '@config/environment'
import { SubstrateDeployment } from '@scio-labs/use-inkathon'

export enum ContractIds {
  Collection = 'collection',
}

export const getDeployments = async (): Promise<SubstrateDeployment[]> => {
  const networks = env.supportedChains
  const deployments = networks
    .map(async (network) => [
      {
        contractId: ContractIds.Collection,
        networkId: network,
        abi: await import(`@inkathon/contracts/deployments/collection/collection.json`),
        address: (await import(`@inkathon/contracts/deployments/collection/alephzero-testnet`)).address,
      },
    ])
    .reduce(async (acc, curr) => [...(await acc), ...(await curr)], [] as any)

  return deployments
}

import { BlockFrostAPI } from '@blockfrost/blockfrost-js'

export async function getAllNFTAssetIds(blockfrost: BlockFrostAPI, policyId: string): Promise<string[]> {
  const assets = await blockfrost.assetsPolicyByIdAll(policyId)
  return assets
    .filter(asset => asset.quantity !== '0')
    .map(asset => asset.asset)
}

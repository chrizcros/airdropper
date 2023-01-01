import { BlockFrostAPI } from '@blockfrost/blockfrost-js'
import { pickNRandom } from './utils/array'
import { getAllNFTAssetIds } from './utils/blockfrost-utils'
import 'dotenv/config'

type Wallet = {
  stakeAddress: string | null
  bech32Addresses: string[]
}

const { BLOCKFROST_SECRET } = process.env
if (!BLOCKFROST_SECRET)
  throw new Error('Blockfrost secret not set. Create a .env file with and set "BLOCKFROST_SECRET"')

const blockfrost = new BlockFrostAPI({ projectId: BLOCKFROST_SECRET })

async function pickRandomAssetIds(policyId: string, n: number): Promise<string[]> {
  const assetIds = await getAllNFTAssetIds(blockfrost, policyId)
  return pickNRandom(assetIds, n)
}

async function getWalletFromAssetId(assetId: string): Promise<Wallet | null> {
  const addresses = (await blockfrost.assetsAddresses(assetId)).map(address => address.address)
  if (!addresses || !addresses.length) return null
  const specificAddress = await blockfrost.addresses(addresses[0])
  return {
    stakeAddress: specificAddress.stake_address,
    bech32Addresses: addresses,
  }
}

async function pickRandomWinner(policyId: string, n: number): Promise<Wallet[]> {
  const assetIds = await pickRandomAssetIds(policyId, n)
  const wallets = [] as Wallet[]
  for await (const assetId of assetIds) {
    const wallet = await getWalletFromAssetId(assetId)
    if (!wallet) continue
    wallets.push(wallet)
  }
  return wallets
}

async function run(policyId: string, n: number) {
  const winnerWallets = await pickRandomWinner(policyId, n)
  console.log(winnerWallets)
}

run('8e74c085955f44ca165ef411bbea170218e00b6fc435749356c31568', 2)
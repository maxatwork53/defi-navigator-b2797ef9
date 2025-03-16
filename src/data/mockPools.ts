
export type Pool = {
  id: string;
  name: string;
  fee: string;
  network: 'ethereum' | 'arbitrum' | 'base';
  dex: string;
  tvl: number;
  volume: number;
  feesCollected: number;
  address: string;
};

export const mockPools: Pool[] = [
  {
    id: "1",
    name: "WETH/USDC",
    fee: "0.05%",
    network: "ethereum",
    dex: "Uniswap V3",
    tvl: 5100000,
    volume: 8250000,
    feesCollected: 24300,
    address: "0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640"
  },
  {
    id: "2",
    name: "WETH/USDT",
    fee: "0.3%",
    network: "ethereum",
    dex: "Uniswap V3",
    tvl: 3200000,
    volume: 6430000,
    feesCollected: 18700,
    address: "0x4e68Ccd3E89f51C3074ca5072bbAC773960dFa36"
  },
  {
    id: "3",
    name: "WBTC/WETH",
    fee: "0.05%",
    network: "ethereum",
    dex: "Uniswap V3",
    tvl: 8700000,
    volume: 12500000,
    feesCollected: 32100,
    address: "0x4585FE77225b41b697C938B018E2Ac67Ac5a20c0"
  },
  {
    id: "4",
    name: "UNI/WETH",
    fee: "0.3%",
    network: "ethereum",
    dex: "Uniswap V3",
    tvl: 1800000,
    volume: 3450000,
    feesCollected: 12400,
    address: "0x1d42064Fc4Beb5F8aAF85F4617AE8b3b5B8Bd801"
  },
  {
    id: "5",
    name: "DAI/USDC",
    fee: "0.01%",
    network: "ethereum",
    dex: "Uniswap V3",
    tvl: 9200000,
    volume: 15400000,
    feesCollected: 8900,
    address: "0x5777d92f208679DB4b9778590Fa3CAB3aC9e2168"
  },
  {
    id: "6",
    name: "WETH/USDC",
    fee: "0.05%",
    network: "arbitrum",
    dex: "Uniswap V3",
    tvl: 3800000,
    volume: 6250000,
    feesCollected: 19500,
    address: "0xC31E54c7a869B9FcBEcc14363CF510d1c41fa443"
  },
  {
    id: "7",
    name: "ARB/WETH",
    fee: "0.3%",
    network: "arbitrum",
    dex: "Uniswap V3",
    tvl: 2400000,
    volume: 5170000,
    feesCollected: 15600,
    address: "0xC6962004f452bE9203591991D15f6b388e09E8D0"
  },
  {
    id: "8",
    name: "WETH/USDC",
    fee: "0.05%",
    network: "base",
    dex: "Uniswap V3",
    tvl: 1900000,
    volume: 3800000,
    feesCollected: 9800,
    address: "0x4C36388bE6F416A29C8d8Eee81C771cE6bE14B18"
  },
  {
    id: "9",
    name: "BALD/WETH",
    fee: "1%",
    network: "base",
    dex: "Uniswap V3",
    tvl: 850000,
    volume: 2650000,
    feesCollected: 28700,
    address: "0x432bD68D6ca4F7720192F20195D00F28F08525D9"
  },
  {
    id: "10",
    name: "WETH/DAI",
    fee: "0.3%",
    network: "base",
    dex: "Uniswap V3",
    tvl: 1200000,
    volume: 2350000,
    feesCollected: 7200,
    address: "0x8b287031B8D6C345Ff4106dE9B52D2B13A9D567C"
  }
];

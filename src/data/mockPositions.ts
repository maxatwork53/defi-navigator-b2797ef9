
export const mockPositions = [
  {
    id: '1',
    pool: 'ETH/USDC',
    status: 'in-range',
    value: 12540.87,
    feesEarned: 185.42,
    range: { lower: 0.98, upper: 1.02, current: 1.001 },
    timeInPosition: '7d 12h',
    rangePercentage: 82,
    totalReturn: 'positive',
    returnValue: 8.2,
  },
  {
    id: '2',
    pool: 'ETH/USDT',
    status: 'in-range',
    value: 8765.32,
    feesEarned: 132.68,
    range: { lower: 0.97, upper: 1.03, current: 1.001 },
    timeInPosition: '4d 6h',
    rangePercentage: 78,
    totalReturn: 'positive',
    returnValue: 6.5,
  },
  {
    id: '3',
    pool: 'WBTC/ETH',
    status: 'out-of-range',
    value: 15230.45,
    feesEarned: 98.75,
    range: { lower: 16.2, upper: 16.8, current: 16.9 },
    timeInPosition: '10d 3h',
    rangePercentage: 0,
    totalReturn: 'negative',
    returnValue: 2.1,
  },
  {
    id: '4',
    pool: 'ETH/DAI',
    status: 'in-range',
    value: 6780.90,
    feesEarned: 87.23,
    range: { lower: 0.99, upper: 1.01, current: 0.995 },
    timeInPosition: '3d 8h',
    rangePercentage: 62,
    totalReturn: 'positive',
    returnValue: 4.8,
  },
  {
    id: '5',
    pool: 'MATIC/ETH',
    status: 'out-of-range',
    value: 4530.25,
    feesEarned: 45.60,
    range: { lower: 0.00028, upper: 0.00033, current: 0.00027 },
    timeInPosition: '6d 15h',
    rangePercentage: 0,
    totalReturn: 'negative',
    returnValue: 1.2,
  },
];

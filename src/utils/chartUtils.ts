
// Memoize the color getter function
export const getColor = (index: number, variant: 'base' | 'win' | 'lose' = 'base') => {
  const colors = [
    { base: '#3b82f6', win: '#10b981', lose: '#ef4444' }, // blue, green, red
    { base: '#8b5cf6', win: '#06b6d4', lose: '#f97316' }, // purple, cyan, orange
    { base: '#ec4899', win: '#84cc16', lose: '#f43f5e' }, // pink, lime, rose
    { base: '#14b8a6', win: '#6366f1', lose: '#ea580c' }, // teal, indigo, orange
    { base: '#f59e0b', win: '#22c55e', lose: '#be185d' }  // amber, green, pink
  ];
  
  const colorIndex = index % colors.length;
  return colors[colorIndex][variant];
};

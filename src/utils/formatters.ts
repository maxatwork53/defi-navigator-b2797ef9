
export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export const formatPercentage = (value: number) => {
  return `${value}%`;
};

export const formatDuration = (hours: number) => {
  const days = Math.floor(hours / 24);
  const remainingHours = hours % 24;
  
  if (days === 0) {
    return `${hours}h`;
  }
  
  return `${days}d ${remainingHours}h`;
};

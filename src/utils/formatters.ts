
export const formatCurrency = (value: number) => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  } else if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}k`;
  } else {
    return `${value.toFixed(1)}`;
  }
};

export const formatPercentage = (value: number) => {
  // For very small values (less than 0.1%), show more decimal places
  if (value < 0.1) {
    return `${value.toFixed(4)}%`;
  }
  return `${value.toFixed(2)}%`;
};

export const formatDuration = (hours: number) => {
  // Round to the nearest full hour
  hours = Math.round(hours);
  
  const days = Math.floor(hours / 24);
  const remainingHours = hours % 24;
  
  if (days === 0) {
    return `${hours}h`;
  }
  
  return `${days}d ${remainingHours}h`;
};

export function formatCurrency(amount) {
  if (isNaN(amount)) return amount;
  if (typeof amount === 'string') {
    amount = Number(amount);
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export function formatPercent(amount) {
  if (isNaN(amount)) return amount;
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    maximumFractionDigits: 3
  }).format(amount/100);
}

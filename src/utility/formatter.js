export function formatCurrency(amount) {
  if (!amount) return amount;
  if (typeof amount === 'string') {
    amount = Number(amount);
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(Number(amount))
}

export function formatPercent(amount) {
  if (!Number(amount)) return amount;
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    maximumFractionDigits: 3
  }).format(amount/100);
}

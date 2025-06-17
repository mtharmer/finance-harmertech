export function formatCurrency(amount) {
  if (!Number(amount)) return amount;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export function formatPercent(amount) {
  if (!Number(amount)) return amount;
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    maximumFractionDigits: 2
  }).format(amount/100);
}

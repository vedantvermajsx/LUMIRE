/**
 * Convert a number to Indian Rupee format with ₹ symbol
 */
export function formatPrice(amount, prefix = 'From') {
  if (!amount && amount !== 0) return '';

  const num = typeof amount === 'string' ? parseInt(amount.replace(/\D/g, '')) : amount;
  if (isNaN(num)) return '';

  const numStr = num.toString();
  const parts = numStr.split('');
  const formatted = [];

  for (let i = 0; i < parts.length; i++) {
    const posFromEnd = parts.length - 1 - i;

    if (i > 0) {
      if ((posFromEnd === 2) || (posFromEnd > 2 && (posFromEnd - 2) % 2 === 0)) {
        formatted.push(',');
      }
    }
    formatted.push(parts[i]);
  }

  const rupeeStr = '₹' + formatted.join('');
  return prefix ? `${prefix} ${rupeeStr}` : rupeeStr;
}

/**
 * Format number with Indian numbering system
 */
export function formatNumberIndian(amount) {
  if (!amount && amount !== 0) return '';
  const num = typeof amount === 'string' ? parseInt(amount.replace(/\D/g, '')) : amount;
  if (isNaN(num)) return '';

  const numStr = num.toString();
  const parts = numStr.split('');
  const formatted = [];

  for (let i = 0; i < parts.length; i++) {
    const posFromEnd = parts.length - 1 - i;

    if (i > 0) {
      if ((posFromEnd === 2) || (posFromEnd > 2 && (posFromEnd - 2) % 2 === 0)) {
        formatted.push(',');
      }
    }
    formatted.push(parts[i]);
  }

  return formatted.join('');
}

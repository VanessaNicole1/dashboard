export const getFullYears = (date) => new Date(date).getFullYear()

export const getMonth = (date) => new Date(date).toLocaleString('default', { month: 'long' });
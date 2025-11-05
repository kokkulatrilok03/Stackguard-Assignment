export const validateKey = (value) => {
  const len = value.trim().length;
  if (len < 100) return 'Key must be at least 100 characters';
  if (len > 1000) return 'Key must be at most 1000 characters';
  return null;
};



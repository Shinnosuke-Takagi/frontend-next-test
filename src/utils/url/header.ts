const tokenString = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('userToken') || '';
  }
  return '';
};

export const jsonHeader = {
  'Content-Type': 'application/json',
};

export const jwtJsonHeader = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${tokenString()}`,
};

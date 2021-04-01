export const __PROD__ = process.env.NODE_ENV === 'production';

export const kApiUrl =
  process.env.NEXT_PUBLIC_API_URL ?? (__PROD__ ? 'https://api-aboqasem.herokuapp.com/' : 'http://localhost:8000/');

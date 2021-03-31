/* eslint-disable @typescript-eslint/naming-convention */

const { NODE_ENV, REACT_APP_DEV_API_URL, REACT_APP_API_URL } = process.env;

const kProdUrl = REACT_APP_API_URL || 'https://api-aboqasem.herokuapp.com/';
const kDevUrl = REACT_APP_DEV_API_URL || 'http://localhost:8000/';

export const __PROD__ = NODE_ENV === 'production';

export const kApiUrl = __PROD__ ? kProdUrl : kDevUrl;

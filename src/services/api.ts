import { getAPIClient } from './axios';

<<<<<<< HEAD
export const api = getAPIClient();
=======
export const api = axios.create({
  baseURL: 'http://localhost:3333/',
  headers: {
    authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2Mjc5MDE5NTgsImV4cCI6MTYyNzk4ODM1OCwic3ViIjoiMTM5ZTI3MWMtYTI3MC00MGMwLWEwYmQtYTgzNTJkMjNhZWJiIn0.QyO4Qsbhf1u534KV7oUKMaApx3OzsXqJC3cfEodcfvs',
  },
});
>>>>>>> 49ac6a3f0b0a757f4c7ec89960049503a128ebfa

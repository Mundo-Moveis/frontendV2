import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3333/',
  headers: {
    authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2Mjc1NTkwOTIsImV4cCI6MTYyNzY0NTQ5Miwic3ViIjoiYzBhZWYwNzgtNjY2Ni00OTlkLTg4NjEtMjY1NWIwYzBlNDNlIn0.2nIH5_Sktlm0WDaZpC5Gq5eQeLWyZRdM5S1U9Korfbo',
  },
});

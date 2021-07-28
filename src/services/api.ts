import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3333/',
  headers: {
    authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2Mjc0NzUxNjAsImV4cCI6MTYyNzU2MTU2MCwic3ViIjoiYzBhZWYwNzgtNjY2Ni00OTlkLTg4NjEtMjY1NWIwYzBlNDNlIn0.C8EE4LCmG50F1a-gt2qJ33wr21SXHwJ36viSW1YHTUU',
  },
});

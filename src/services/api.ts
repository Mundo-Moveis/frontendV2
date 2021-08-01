import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3333/',
  headers: {
    authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2Mjc4MjkwMTgsImV4cCI6MTYyNzkxNTQxOCwic3ViIjoiYzBhZWYwNzgtNjY2Ni00OTlkLTg4NjEtMjY1NWIwYzBlNDNlIn0.S2fpR-XKsNHQYE-2bJUJEepIycwI0EJN-5gMOUR0d3Q',
  },
});

import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3333/',
  headers: {
    authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MjU0ODc4NzIsImV4cCI6MTYyNTU3NDI3Miwic3ViIjoiN2FhM2Y1YjItNjkyZC00ZTJiLWFkNDgtN2E2YjMzZDIxZDk5In0.SGT-G86X3VQh0zbmYZSBhrKQ_cZf2-y9a0liW9rk43Q',
  },
});

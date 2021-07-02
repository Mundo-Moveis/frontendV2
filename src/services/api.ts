import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3333/',
  headers: {
    authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MjUyMjc0NDcsImV4cCI6MTYyNTMxMzg0Nywic3ViIjoiN2FhM2Y1YjItNjkyZC00ZTJiLWFkNDgtN2E2YjMzZDIxZDk5In0.6vfWw6Pomx6WQJ4UZNGgZyxwQGsfcHXbaXzEo6S5hlc',
  },
});

import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3333/',
  headers: {
    authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MjQ4ODU4NjUsImV4cCI6MTYyNDk3MjI2NSwic3ViIjoiN2FhM2Y1YjItNjkyZC00ZTJiLWFkNDgtN2E2YjMzZDIxZDk5In0.j4f085BkI4SzMM0qR49yUuBA0uIYrIryjdGECo7L7tw',
  },
});

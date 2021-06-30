import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3333/',
  headers: {
    authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MjUwNTQ2NDIsImV4cCI6MTYyNTE0MTA0Miwic3ViIjoiN2FhM2Y1YjItNjkyZC00ZTJiLWFkNDgtN2E2YjMzZDIxZDk5In0.24l7NV4Fgadgnop6xOTizLrIC--xYx6yXDYBNNO-Ue8',
  },
});

import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3333/',
  headers: {
    authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MjQ5Njc1MDYsImV4cCI6MTYyNTA1MzkwNiwic3ViIjoiN2FhM2Y1YjItNjkyZC00ZTJiLWFkNDgtN2E2YjMzZDIxZDk5In0.y2W_6mPd5FvcL7CvOWXjnD2PTdufUWnWuOa5A3jSY4I',
  },
});

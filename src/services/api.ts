import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3333/',
  headers: {
    authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MjY0Mzk5MzYsImV4cCI6MTYyNjUyNjMzNiwic3ViIjoiM2FmMDkyOWYtZTYzMi00ODVmLWI5MmYtZjAyYjNmNDgxZmNmIn0.8huLhsiXQ999b3m8NR8l9KNewGyMguNcxMLG0UOzXU0',
  },
});

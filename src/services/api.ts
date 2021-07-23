import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3333/',
  headers: {
    authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MjY5NTYyNjUsImV4cCI6MTYyNzA0MjY2NSwic3ViIjoiM2FmMDkyOWYtZTYzMi00ODVmLWI5MmYtZjAyYjNmNDgxZmNmIn0.mTUk-NlE3tB2tOzHH8sAS2tjkncAGvvytMk46KmYbBU',
  },
});

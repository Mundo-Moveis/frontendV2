import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3333/',
  headers: {
    authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MjY3MTczOTcsImV4cCI6MTYyNjgwMzc5Nywic3ViIjoiM2FmMDkyOWYtZTYzMi00ODVmLWI5MmYtZjAyYjNmNDgxZmNmIn0.qaqGO6HGBG4JnRWa3z5BLtQ_yjo0K-mcLMxbukkCuxk',
  },
});

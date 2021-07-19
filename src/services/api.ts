import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3333/',
  headers: {
    authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MjY2MTU5NjAsImV4cCI6MTYyNjcwMjM2MCwic3ViIjoiM2FmMDkyOWYtZTYzMi00ODVmLWI5MmYtZjAyYjNmNDgxZmNmIn0.KfX72PcGvtSc0Oezv5NR5k1uGzzyBqpe75msAROW2w8',
  },
});

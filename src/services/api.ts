import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3333/',
  headers: {
    authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MjY4NjkzNjMsImV4cCI6MTYyNjk1NTc2Mywic3ViIjoiM2FmMDkyOWYtZTYzMi00ODVmLWI5MmYtZjAyYjNmNDgxZmNmIn0.AnEDDKB_ypLvXlB53lgy_xjNSfjkVtB-Gxf7fGUzTCw',
  },
});

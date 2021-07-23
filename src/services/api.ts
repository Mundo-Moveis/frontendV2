import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3333/',
  headers: {
    authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MjcwNDI2NjIsImV4cCI6MTYyNzEyOTA2Miwic3ViIjoiM2FmMDkyOWYtZTYzMi00ODVmLWI5MmYtZjAyYjNmNDgxZmNmIn0.kk-lTsrK5yqsPRhqB-4103TYBOcZehEFO9d8ThIPLZQ',
  },
});

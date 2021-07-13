import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3333/',
  headers: {
    authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MjYxNzU2MDgsImV4cCI6MTYyNjI2MjAwOCwic3ViIjoiMTVkMjlmNmEtZjljZC00ZmQ2LWJiMTYtNjNhMGI1OTZiNWQ2In0.5bL00XmLVCzAeKnoSLWEfSk69IYnUr1ISRpucnXfEHA',
  },
});

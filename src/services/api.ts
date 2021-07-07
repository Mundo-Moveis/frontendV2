import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3333/',
  headers: {
    authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MjU2NjQzNzQsImV4cCI6MTYyNTc1MDc3NCwic3ViIjoiMTVkMjlmNmEtZjljZC00ZmQ2LWJiMTYtNjNhMGI1OTZiNWQ2In0.Zk_YyJ2h2R_DEjmYQbQL8okU8jM0sr4SPGrUPm5R5W4',
  },
});

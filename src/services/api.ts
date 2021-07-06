import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3333/',
  headers: {
    authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MjU1Nzc3NzAsImV4cCI6MTYyNTY2NDE3MCwic3ViIjoiMTVkMjlmNmEtZjljZC00ZmQ2LWJiMTYtNjNhMGI1OTZiNWQ2In0.2RsplPpKTBIUWQ_dLnHvSkuSGdN3nz73DwpPjMr6H_g',
  },
});

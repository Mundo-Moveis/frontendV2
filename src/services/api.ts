import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3333/',
  headers: {
    authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MjQ2NDg2NTIsImV4cCI6MTYyNDczNTA1Miwic3ViIjoiMTM5ZTI3MWMtYTI3MC00MGMwLWEwYmQtYTgzNTJkMjNhZWJiIn0.Tzyw2AAeH1VDczUa7Gu7OtUsVpLjP4gS5k-vdfhCodw'
  }
});

import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3333/',
  headers: {
    authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MjYyNjM5NzAsImV4cCI6MTYyNjM1MDM3MCwic3ViIjoiMTVkMjlmNmEtZjljZC00ZmQ2LWJiMTYtNjNhMGI1OTZiNWQ2In0.GLRjSISSeBWlg7KiKZE7XmkL6f-6Y8VOeTdPRAHMnZA',
  },
});

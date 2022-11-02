import axios from 'axios';

const base = process.env.NEXT_PUBLIC_API_ENDPOINT;

const userBase = `${base}/api/users`;

export function registerUser(payload: {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}) {
  return axios.post(userBase, payload).then((res) => res.data);
}
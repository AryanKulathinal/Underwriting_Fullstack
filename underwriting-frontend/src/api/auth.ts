import axios from 'axios';

const AUTH_BASE_URL = 'http://localhost:3000/auth';

interface LoginDto {
  username: string;
  password: string;
}

interface RegisterDto{
  name: string;
  username: string;
  password: string;
}


export const login = async ({ username, password }: LoginDto) => {
  try {
    const response = await axios.post(`${AUTH_BASE_URL}/login`, {
      username,
      password,
    });

    const token = response.data.access_token;

    if (token) {
      localStorage.setItem('access_token', token);
    }

    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};


export const register = async ({ name, username, password }: RegisterDto) => {
  try {
    const response = await axios.post(`${AUTH_BASE_URL}/register`, {
      name,
      username,
      password,
    });

    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Registration failed');
  }
};

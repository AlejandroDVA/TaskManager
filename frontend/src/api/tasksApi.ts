import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const getTasks = async () => {
  const response = await axios.get(`${API_URL}/tasks`);
  return response.data;
};

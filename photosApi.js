import axios from 'axios';

const BASE_URL = 'https://picsum.photos/v2/list';

export const fetchPhotos = async (page, limit) => {
  try {
    const response = await axios.get(`${BASE_URL}?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching photos:', error);
    throw error;
  }
}; 
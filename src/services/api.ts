import { Filters, DataPoint } from '../types';


export const fetchData = async (filters: Filters): Promise<DataPoint[]> => {
  try {
    const response = await fetch(`${ import.meta.env.VITE_API_BASE_URL}/data`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(filters)
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
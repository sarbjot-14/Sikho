import axios from 'axios';

const client = axios.create({
  baseURL: 'https://localhost:7250/',
});

// Industry
export const getIndustries = async () => {
  const response = await client.get('industry');
  return response.data;
};

// Occupations
export const getOccupations = async (industryId?: string) => {
  const response = await client.get('occupation', {
    params: { industryId },
  });
  return response.data;
};

// Company

export const getCompanies = async () => {
  const response = await client.get('company');
  return response.data;
};

// Datapoints

export const getDatapoints = async () => {
  const response = await client.get('datapoint');
  return response.data;
};

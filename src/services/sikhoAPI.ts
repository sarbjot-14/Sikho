import axios from 'axios';

const client = axios.create({
  baseURL: process.env.REACT_APP_Sikho_API,
});

// Industry
export const getIndustries = async () => {
  const response = await client.get('/industry');
  console.log('here are the industriessss ', response);
  return response.data;
};

// Occupations
export const getOccupations = async (industryId?: string) => {
  const response = await client.get('/occupation', {
    params: { industryId },
  });
  return response.data;
};

// Company

export const getCompanies = async () => {
  const response = await client.get('/company');
  return response.data;
};

// Datapoints

export const getDatapoints = async () => {
  const response = await client.get('/datapoint');
  return response.data;
};

// JobGrowthPolls

export const postJobGrowthPoll = async (poll: any) => {
  const response = await client.post('/jobgrowthpoll', poll);
  return response.data;
};

export const getJobGrowthPoll = async () => {
  const response = await client.get('/jobgrowthpoll');
  return response.data;
};

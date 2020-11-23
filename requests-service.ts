import axios from 'axios';

export const startCalculation = async (data: number): Promise<{ request_id: string }> => {
  return axios
    .post('http://35.195.195.133:9005', { data })
    .then(({ data }) => data)
    .catch((err) => {
      const errorStatus = err?.response?.status;
      if (errorStatus === 403) {
        return new Promise((resolve) => {
          setTimeout(() => resolve(startCalculation(data)), 500);
        });
      }
    });
};

export const getCalculation = async (request_id: string): Promise<{ result: number }> => {
  return axios
    .get('http://35.195.195.133:9005', {
      params: { request_id },
    })
    .then(({ data }) => data)
    .catch((err) => {
      const errorStatus = err?.response?.status;
      if (errorStatus === 400) {
        return new Promise((resolve) => {
          setTimeout(() => resolve(getCalculation(request_id)), 500);
        });
      }
    });
};

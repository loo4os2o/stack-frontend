const URL = 'https://stack-fastapi.onrender.com/api';

export const getSummary = async (projCd: any, token: string) => {
  const response = await fetch(`${URL}/analysis/${projCd}/summary`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};

export const getStackEffectForecast = async (projCd: any, token: string) => {
  const response = await fetch(`${URL}/analysis/${projCd}/stack-effect-forecast`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};

export const getIssueForecast = async (projCd: any, token: string) => {
  const response = await fetch(`${URL}/analysis/${projCd}/issue-forecast`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};

export const getPressureDiffrentials = async (projCd: any, token: string) => {
  const response = await fetch(`${URL}/analysis/${projCd}/pressure-differentials`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};

export const getSolutionOverview = async (projCd: any, token: string) => {
  const response = await fetch(`${URL}/solutions/${projCd}/overview`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};

export const getSolutionRecommendations = async (projCd: any, token: string) => {
  const response = await fetch(`${URL}/solutions/${projCd}/recommendations`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};

export const getSolutionSimulation = async (projCd: any, token: string) => {
  const response = await fetch(`${URL}/solutions/${projCd}/simulation`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};

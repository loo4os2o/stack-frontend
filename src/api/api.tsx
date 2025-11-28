const getApiBaseUrl = () => {
  // In the browser, use a relative path so Nginx can proxy /api to the backend.
  if (typeof window !== 'undefined') {
    return '/api';
  }

  // SSR/build fallback; can be overridden via env when needed.
  return process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8004/api';
};

const URL = getApiBaseUrl();

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

import axios from 'axios';
import { Request } from '../types/api';

export const createHttpRequest = <T>(request: Request, testOptions = {}) => {
  const url = combineUrlWithAdditionalInfo(request);
  const requestConfig = { ...request, url };

  if (process.env.NODE_ENV !== 'production') {
    requestConfig.headers = testOptions;
  }

  return axios.request<T>(requestConfig);
};

export const combineUrlWithAdditionalInfo = (request: any) => {
  const { params, query } = request;
  let { url } = request;
  let addition = '';

  if (params) {
    url = replaceUrlParams(url, params);
  }

  if (query) {
    addition += `?${makeQueryString(query)}`;
  }

  return `${url}${addition}`;
};

export const makeQueryString = (query: object) => {
  const result = Object.entries(query)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
  return result;
};

export const replaceUrlParams = (url: string, params: string) => {
  let replacedUrl = url;

  Object.entries(params).forEach(([key, value]) => {
    replacedUrl = replacedUrl.replace(`:${key}`, value);
  });

  return replacedUrl;
};

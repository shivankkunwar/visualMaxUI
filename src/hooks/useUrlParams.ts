import { useNavigate, useLocation } from 'react-router-dom';
import { UrlParams } from '../types';

const useUrlParams = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const setUrlParams = (params: UrlParams) => {
    const searchParams = new URLSearchParams(location.search);
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        searchParams.set(key, value);
      } else {
        searchParams.delete(key);
      }
    });
    navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
  };

  const getUrlParams = (): UrlParams => {
    return Object.fromEntries(new URLSearchParams(location.search));
  };

  return { setUrlParams, getUrlParams };
};

export default useUrlParams;
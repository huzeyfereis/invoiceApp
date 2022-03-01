import axios from 'axios';

export const useAxios = async (url, method, data, tokenType) => {
  let token = JSON.parse(localStorage.getItem('okta-token-storage'));

  const response = await axios({
    url,
    method,
    data,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization:
        'Bearer ' +
        (tokenType === 'accessToken'
          ? token.accessToken.accessToken
          : token.idToken.idToken)
    }
  });
  const responseData = await response.data;
  return responseData;
};

import axios from 'axios';

const validateToken = async (token) => {
  const url = 'https://back-api-desafio.herokuapp.com/users/validate';
  const result = await axios.get(url, {
    headers: {
      authorization: token,
    },
  }).then((response) => response.data.message).catch((error) => error.response.data.message);

  return result;
};

export default validateToken;

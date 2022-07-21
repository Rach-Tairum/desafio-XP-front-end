import axios from 'axios';

const makeDeposit = async (token, objDeposito) => {
  const url = 'https://back-api-desafio.herokuapp.com/users/deposito';

  const result = await axios.put(url, objDeposito, {
    headers: {
      authorization: token,
    },
  }).then((response) => response.data).catch((error) => error.response.data.message);

  return result;
};

export default makeDeposit;

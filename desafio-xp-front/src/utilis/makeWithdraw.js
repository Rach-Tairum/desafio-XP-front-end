import axios from 'axios';

const makeWithdraw = async (token, objSaque) => {
  const url = 'https://back-api-desafio.herokuapp.com/users/saque';

  const result = await axios.put(url, objSaque, {
    headers: {
      authorization: token,
    },
  }).then((response) => response.data).catch((error) => error.response.data.message);

  return result;
};

export default makeWithdraw;

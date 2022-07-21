import axios from 'axios';

const makeSell = async (token, idEmpresa, objBody) => {
  const url = `https://back-api-desafio.herokuapp.com/acoes/venda/${idEmpresa}`;
  const result = await axios.put(url, objBody, {
    headers: {
      authorization: token,
    },
  }).then((response) => response.data.message).catch((error) => error.response.data.message);

  return result;
};

export default makeSell;

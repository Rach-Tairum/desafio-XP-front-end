import axios from 'axios';

const makeBuy = async (token, idEmpresa, objBody) => {
  const url = `https://back-api-desafio.herokuapp.com/acoes/compra/${idEmpresa}`;

  const result = await axios.put(url, objBody, {
    headers: {
      authorization: token,
    },
  }).then((response) => response.data).catch((error) => error);

  return result;
};

export default makeBuy;

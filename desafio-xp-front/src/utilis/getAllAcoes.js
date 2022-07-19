import axios from 'axios';

const getAllAcoes = async (setAcoes, setFilterAcoes) => {
  const url = 'https://back-api-desafio.herokuapp.com/acoes';
  await axios.get(url).then((response) => {
    setAcoes(response.data);
    setFilterAcoes(response.data);
  }).catch((error) => {
    console.log(error);
  });
};

export default getAllAcoes;

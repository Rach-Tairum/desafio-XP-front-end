import axios from 'axios';

const getUserInfos = async (setName, setSaldo) => {
  const email = localStorage.getItem('userXP');
  const url = `https://back-api-desafio.herokuapp.com/users/email?q=${email}`;
  await axios.get(url).then((response) => {
    setName(response.data.userName);
    setSaldo(response.data.saldo);
  });
};

export default getUserInfos;

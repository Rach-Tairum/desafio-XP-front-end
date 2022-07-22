import axios from 'axios';

const getUserInfos = async (setName, setIdSaldo) => {
  const email = localStorage.getItem('userXP');
  const objInfos = JSON.parse(email);
  const url = `https://back-api-desafio.herokuapp.com/users/email?q=${objInfos.email}`;
  await axios.get(url).then((response) => {
    const obj = {
      id: response.data.userId,
      saldo: response.data.saldo,
    };
    setName(response.data.userName);
    setIdSaldo(obj);
  });
};

export default getUserInfos;

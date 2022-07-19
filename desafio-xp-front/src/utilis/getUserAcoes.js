import axios from 'axios';

const filterInfos = (arrInfos, acoes) => {
  const arrfiltrado = arrInfos.map((info) => {
    const empresa = acoes.find((acao) => acao.id === info.acaoId);
    return {
      id: empresa.id,
      empresa: empresa.nomeEmpresa,
      qtdComprada: info.qtdAcoesCompradas,
      valor: info.valorTotalCompra,
    };
  });

  return arrfiltrado;
};

const getUserAcoes = async (setMinhasAcoes, acoes, idSaldo) => {
  const { id } = idSaldo;
  const url = `https://back-api-desafio.herokuapp.com/acoesUser/${id}`;

  await axios.get(url).then((response) => {
    const result = filterInfos(response.data, acoes);
    setMinhasAcoes(result);
  }).catch((error) => {
    console.log(error);
  });
};

export default getUserAcoes;

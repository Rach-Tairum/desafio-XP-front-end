import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { MyContext } from '../context/Provider';
import getUserAcoes from '../utilis/getUserAcoes';

function MinhasAcoes() {
  const [minhasAcoes, setMinhasAcoes] = useState([]);
  const { acoes, idSaldo, negocia } = useContext(MyContext);
  const history = useHistory();

  useEffect(() => {
    const getInfos = async () => {
      await getUserAcoes(setMinhasAcoes, acoes, idSaldo);
    };
    getInfos();
  }, []);

  const trabalhaAcoes = (id, negociacao) => {
    negocia(id, negociacao);
    history.push('/negociacao');
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Empresa</th>
            <th>Qtd</th>
            <th>Valor(R$)</th>
            <th>Negociação</th>
          </tr>
        </thead>
        <tbody>
          {minhasAcoes.map(({
            id, empresa, qtdComprada, valor,
          }) => (
            <tr key={id}>
              <td>{ empresa }</td>
              <td>{ qtdComprada }</td>
              <td>{ valor }</td>
              <td>
                <button type="button" onClick={() => trabalhaAcoes(id, 'compra')}>C</button>
                <button type="button" onClick={() => trabalhaAcoes(id, 'venda')}>V</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MinhasAcoes;

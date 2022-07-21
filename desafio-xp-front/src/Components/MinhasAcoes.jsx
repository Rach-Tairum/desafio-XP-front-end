import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { MyContext } from '../context/Provider';
import validateToken from '../utilis/validateToken';

function MinhasAcoes() {
  const {
    negocia,
    minhasAcoes,
    getMyInfos,
    token,
    getPersonInfos,
  } = useContext(MyContext);
  const history = useHistory();

  useEffect(() => {
    getPersonInfos();
    getMyInfos();
  }, []);

  const trabalhaAcoes = async (id, negociacao) => {
    negocia(id, negociacao);
    const message = await validateToken(token);

    if (message !== 'OK') {
      history.push('/unauthorized');
    } else {
      history.push('/negociacao');
    }
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

import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { MyContext } from '../context/Provider';
import validateToken from '../utilis/validateToken';
import Loading from './Loading';

import * as R from '../assets/styles/loginStyle';
import * as L from '../assets/styles/acoesStyle';
import { Compra, Venda } from '../assets/styles/minhasAcoesStyle';

function MinhasAcoes() {
  const {
    negocia,
    minhasAcoes,
    getMyInfos,
    token,
  } = useContext(MyContext);
  const history = useHistory();

  useEffect(() => {
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
  };

  return (
    minhasAcoes.length === 0 ? <Loading />
      : (
        <R.Container>
          <table>
            <thead>
              <tr>
                <L.TabelaTitulos>Empresa</L.TabelaTitulos>
                <L.TabelaTitulos>Qtd</L.TabelaTitulos>
                <L.TabelaTitulos>Valor(R$)</L.TabelaTitulos>
                <L.ColunaEspecial>Negociação</L.ColunaEspecial>
              </tr>
            </thead>
            <tbody>
              {minhasAcoes.map(({
                id, empresa, qtdComprada, valor,
              }) => (
                <tr key={id}>
                  <L.TabelaCorpo>{ empresa }</L.TabelaCorpo>
                  <L.TabelaCorpo>{ qtdComprada }</L.TabelaCorpo>
                  <L.TabelaCorpo>{ valor }</L.TabelaCorpo>
                  <L.TabelaCorpo>
                    <Compra type="button" onClick={() => trabalhaAcoes(id, 'compra')}>C</Compra>
                    <Venda type="button" onClick={() => trabalhaAcoes(id, 'venda')}>V</Venda>
                  </L.TabelaCorpo>
                </tr>
              ))}
            </tbody>
          </table>
        </R.Container>
      )
  );
}

export default MinhasAcoes;

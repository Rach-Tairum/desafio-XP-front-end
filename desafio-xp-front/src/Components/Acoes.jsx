import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { MyContext } from '../context/Provider';
import validateToken from '../utilis/validateToken';
import Loading from './Loading';

import * as R from '../assets/styles/loginStyle';
import * as L from '../assets/styles/acoesStyle';

function Acoes() {
  const {
    acoes,
    filterAcoes,
    setFilterAcoes,
    getInfos,
    negocia,
    token,
  } = useContext(MyContext);

  const [valueInput, setValueInput] = useState('');
  const history = useHistory();

  useEffect(() => {
    getInfos();
  }, []);

  const handleChange = ({ target }) => {
    const { value } = target;
    setValueInput(value);

    if (value === '') {
      setFilterAcoes(acoes);
    } else {
      const arrFiltrado = acoes.filter((empresa) => {
        const inputValue = value.toUpperCase();
        const empresaValue = empresa.nomeEmpresa.toUpperCase();
        return empresaValue.includes(inputValue);
      });
      setFilterAcoes(arrFiltrado);
    }
  };

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
    filterAcoes.length === 0 ? <Loading />
      : (
        <R.Container>
          <L.RotuloBusca htmlFor="filtro">
            Filtre por nome da empresa:
            {' '}
            <L.InputBusca type="text" onChange={handleChange} value={valueInput} placeholder="Digite o nome da empresa" id="filtro" />
          </L.RotuloBusca>
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
              {filterAcoes.map(({
                id, nomeEmpresa, qtdAcoes, valorAcao,
              }) => (
                <tr key={id}>
                  <L.TabelaCorpo>{ nomeEmpresa }</L.TabelaCorpo>
                  <L.TabelaCorpo>{ qtdAcoes }</L.TabelaCorpo>
                  <L.TabelaCorpo>{ valorAcao }</L.TabelaCorpo>
                  <L.TabelaCorpo>
                    <L.Compra type="button" onClick={() => trabalhaAcoes(id, 'compra')}>C</L.Compra>
                  </L.TabelaCorpo>
                </tr>
              ))}
            </tbody>
          </table>
        </R.Container>
      )
  );
}

export default Acoes;

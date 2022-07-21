import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { MyContext } from '../context/Provider';
import validateToken from '../utilis/validateToken';

function Acoes() {
  const {
    acoes,
    filterAcoes,
    setFilterAcoes,
    getInfos,
    negocia,
    token,
    getPersonInfos,
  } = useContext(MyContext);

  const [valueInput, setValueInput] = useState('');
  const history = useHistory();

  useEffect(() => {
    getPersonInfos();
    getInfos();
  }, [acoes]);

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
    <div>
      <label htmlFor="filtro">
        Filtre por nome da empresa:
        {' '}
        <input type="text" onChange={handleChange} value={valueInput} placeholder="Digite o nome da empresa" id="filtro" />
      </label>
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
          {filterAcoes.map(({
            id, nomeEmpresa, qtdAcoes, valorAcao,
          }) => (
            <tr key={id}>
              <td>{ nomeEmpresa }</td>
              <td>{ qtdAcoes }</td>
              <td>{ valorAcao }</td>
              <td>
                <button type="button" onClick={() => trabalhaAcoes(id, 'compra')}>C</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Acoes;

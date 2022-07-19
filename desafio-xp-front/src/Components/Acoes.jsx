import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { MyContext } from '../context/Provider';
import getAllAcoes from '../utilis/getAllAcoes';

function Acoes() {
  const { acoes, setAcoes, negocia } = useContext(MyContext);
  const [filterAcoes, setFilterAcoes] = useState([]);
  const [valueInput, setValueInput] = useState('');
  const history = useHistory();

  useEffect(() => {
    const getInfos = async () => {
      await getAllAcoes(setAcoes, setFilterAcoes);
    };
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

  const trabalhaAcoes = (id, negociacao) => {
    negocia(id, negociacao);
    history.push('/negociacao');
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

/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState, useContext } from 'react';
import { MyContext } from '../context/Provider';
import getUserAcoes from '../utilis/getUserAcoes';

function MinhasAcoes() {
  const [minhasAcoes, setMinhasAcoes] = useState([]);
  const { acoes, idSaldo } = useContext(MyContext);

  useEffect(() => {
    const getInfos = async () => {
      await getUserAcoes(setMinhasAcoes, acoes, idSaldo);
    };
    getInfos();
  }, []);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Empresa</th>
            <th>Qtd</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          {minhasAcoes.map(({
            empresa, qtdComprada, valor,
          }, index) => (
            <tr key={index}>
              <td>{ empresa }</td>
              <td>{ qtdComprada }</td>
              <td>{ valor }</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MinhasAcoes;

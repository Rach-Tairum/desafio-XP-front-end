import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { MyContext } from '../context/Provider';
import makeSell from '../utilis/makeSell';

function CompraAcoes() {
  const { ObjNegocio, acoes, token } = useContext(MyContext);
  const [dadosEmpresa, setDadosEmpresa] = useState({});
  const [inputValue, setInputValue] = useState(0);
  const [valorPago, setValorPago] = useState(0);
  const [retornoText, setRetornoText] = useState('');
  const history = useHistory();

  useEffect(() => {
    const empresa = acoes.find((item) => item.id === ObjNegocio.idEmpresa);
    setDadosEmpresa(empresa);
  }, []);

  const showPriceAndQtd = ({ target }) => {
    const { value } = target;

    if (value < 0) {
      setInputValue(0);
      setValorPago(0);
    } else if (value > Number(dadosEmpresa.qtdAcoes)) {
      setInputValue(Number(dadosEmpresa.qtdAcoes));
      const total = Number(dadosEmpresa.valorAcao) * Number(dadosEmpresa.qtdAcoes);
      setValorPago(total);
    } else {
      setInputValue(value);
      const total = Number(dadosEmpresa.valorAcao) * value;
      setValorPago(total);
    }
  };

  const clickSell = async () => {
    const objCompra = {
      qtdComprada: inputValue,
      valorCompra: valorPago,
    };
    const sell = await makeSell(token, ObjNegocio.idEmpresa, objCompra);

    setRetornoText(sell);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Empresa</th>
            <th>Qtd</th>
            <th>Valor(R$)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{ObjNegocio.idEmpresa}</td>
            <td>{ dadosEmpresa.qtdAcoes }</td>
            <td>{ dadosEmpresa.valorAcao }</td>
          </tr>
        </tbody>
      </table>
      <label htmlFor="qtd">
        Qtd de ações
        <input type="number" value={inputValue} id="qtd" max={dadosEmpresa.qtdAcoes} onChange={showPriceAndQtd} />
      </label>
      <p>
        Max:
        {' '}
        {dadosEmpresa.qtdAcoes}
      </p>
      <p>{valorPago}</p>
      <button type="button" onClick={clickSell}>Comprar</button>
      <button type="button" onClick={() => history.push('/acoes')}>Voltar</button>
      <p>{retornoText}</p>
    </div>
  );
}

export default CompraAcoes;

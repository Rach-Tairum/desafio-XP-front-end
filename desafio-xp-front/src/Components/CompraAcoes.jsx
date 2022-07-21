import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { MyContext } from '../context/Provider';
import makeBuy from '../utilis/makeBuy';

function CompraAcoes() {
  const {
    ObjNegocio, acoes, token, idSaldo, setIdSaldo,
  } = useContext(MyContext);
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

    if (Number(value) < 0) {
      setInputValue(0);
      setRetornoText('Quantidade de Ações Inválida');
      setValorPago(0);
    } else if (Number(value) > Number(dadosEmpresa.qtdAcoes)) {
      setInputValue(Number(dadosEmpresa.qtdAcoes));
      setRetornoText('Quantidade de Ações Inválida');
      const total = Number(dadosEmpresa.valorAcao) * Number(dadosEmpresa.qtdAcoes);
      if (total > idSaldo.saldo) {
        setRetornoText('Saldo insuficiente');
      } else {
        setValorPago(total);
      }
    } else {
      setInputValue(Number(value));
      const total = Number(dadosEmpresa.valorAcao) * Number(value);
      if (total > idSaldo.saldo) {
        setRetornoText('Saldo insuficiente');
      } else {
        setValorPago(total);
      }
    }
  };

  const clickSell = async () => {
    const objCompra = {
      qtdComprada: inputValue,
      valorCompra: valorPago,
    };
    const sell = await makeBuy(token, ObjNegocio.idEmpresa, objCompra);

    if (sell.includes('Token' || 'Expirada')) {
      history.push('/unauthorized');
    } else {
      setRetornoText(sell);
      const total = idSaldo.saldo - valorPago;
      setIdSaldo(total);
    }
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
            <td>{dadosEmpresa.nomeEmpresa}</td>
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
      <p>{retornoText}</p>
      <button type="button" onClick={clickSell}>Comprar</button>
      <button type="button" onClick={() => history.push('/acoes')}>Voltar</button>
    </div>
  );
}

export default CompraAcoes;

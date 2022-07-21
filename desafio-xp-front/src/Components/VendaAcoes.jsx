import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { MyContext } from '../context/Provider';
import makeSell from '../utilis/makeSell';

function VendaAcoes() {
  const {
    ObjNegocio, acoes, token, idSaldo, setIdSaldo, minhasAcoes,
  } = useContext(MyContext);
  const [dadosEmpresa, setDadosEmpresa] = useState({});
  const [dadosUsuário, setDadosUsuário] = useState({});
  const [inputValue, setInputValue] = useState(0);
  const [valorRecebido, setValorRecebido] = useState(0);
  const [retornoText, setRetornoText] = useState('');
  const history = useHistory();

  useEffect(() => {
    const empresa = acoes.find((item) => item.id === ObjNegocio.idEmpresa);
    const user = minhasAcoes.find((item) => item.id === ObjNegocio.idEmpresa);
    setDadosEmpresa(empresa);
    setDadosUsuário(user);
  }, []);

  const showPriceAndQtd = ({ target }) => {
    const { value } = target;

    if (value < 0) {
      setInputValue(0);
      setRetornoText('Quantidade de Ações Inválida');
      setValorRecebido(0);
    } else if (value > Number(dadosUsuário.qtdComprada)) {
      setInputValue(Number(dadosUsuário.qtdComprada));
      setRetornoText('Quantidade de Ações Inválida');
      const total = Number(dadosEmpresa.valorAcao) * Number(dadosUsuário.qtdComprada);
      setValorRecebido(total);
    } else {
      setInputValue(value);
      const total = Number(dadosEmpresa.valorAcao) * value;
      setValorRecebido(total);
    }
  };

  const clickSell = async () => {
    const objCompra = {
      qtdVendida: inputValue,
      valorVenda: valorRecebido,
    };
    const sell = await makeSell(token, ObjNegocio.idEmpresa, objCompra);

    if (sell.includes('Token' || 'Expirada')) {
      history.push('/unauthorized');
    } else {
      setRetornoText(sell);
      const total = idSaldo.saldo + valorRecebido;
      setIdSaldo(total);
    }
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Empresa</th>
            <th>Qtd minhas ações</th>
            <th>Valor total das minhas ações(R$)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{ObjNegocio.idEmpresa}</td>
            <td>{ dadosUsuário.qtdComprada }</td>
            <td>{ dadosUsuário.valor }</td>
          </tr>
        </tbody>
      </table>
      <label htmlFor="qtd">
        Qtd de ações
        <input type="number" value={inputValue} id="qtd" max={dadosUsuário.qtdComprada} onChange={showPriceAndQtd} />
      </label>
      <p>
        Max:
        {' '}
        {dadosUsuário.qtdComprada}
      </p>
      <p>{valorRecebido}</p>
      <p>{retornoText}</p>
      <button type="button" onClick={clickSell}>Comprar</button>
      <button type="button" onClick={() => history.push('/acoes')}>Voltar</button>
    </div>
  );
}

export default VendaAcoes;

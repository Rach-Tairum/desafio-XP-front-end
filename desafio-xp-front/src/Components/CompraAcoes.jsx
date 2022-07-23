import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { MyContext } from '../context/Provider';
import makeBuy from '../utilis/makeBuy';

import { CarteiraButtons } from '../assets/styles/carteiraStyle';
import { ErroMessage } from '../assets/styles/loginStyle';
import * as N from '../assets/styles/negociacaoStyle';
import * as L from '../assets/styles/acoesStyle';

function CompraAcoes() {
  const {
    ObjNegocio, acoes, token, idSaldo, setIdSaldo,
  } = useContext(MyContext);
  const [dadosEmpresa, setDadosEmpresa] = useState({});
  const [inputValue, setInputValue] = useState(0);
  const [valorPago, setValorPago] = useState(0);
  const [retornoText, setRetornoText] = useState('');
  const [ableClick, setAbleClick] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const empresa = acoes.find((item) => item.id === ObjNegocio.idEmpresa);
    setDadosEmpresa(empresa);
  }, []);

  const showPriceAndQtd = ({ target }) => {
    const { value } = target;

    if (Number(value) < 0 || Number(value) === 0) {
      setInputValue(0);
      setRetornoText('Quantidade de Ações Inválida');
      setValorPago(0);
      setAbleClick(true);
    } else if (Number(value) > Number(dadosEmpresa.qtdAcoes)) {
      setInputValue(Number(dadosEmpresa.qtdAcoes));
      setRetornoText('Quantidade de Ações Máxima Ultrapassada');
      setAbleClick(true);
      const total = Number(dadosEmpresa.valorAcao) * Number(dadosEmpresa.qtdAcoes);
      setValorPago(total);
    } else {
      setInputValue(Number(value));
      setRetornoText('');
      const total = Number(dadosEmpresa.valorAcao) * Number(value);
      if (total > idSaldo.saldo) {
        setRetornoText('Saldo insuficiente');
        setValorPago(total);
        setAbleClick(true);
      } else {
        setRetornoText('');
        setValorPago(total);
        setAbleClick(false);
      }
    }
  };

  const clickSell = async () => {
    setRetornoText('Aguarde...');
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
      setAbleClick(true);
    }
  };

  return (
    <div>
      <N.Tabela>
        <thead>
          <tr>
            <L.TabelaTitulos>Empresa</L.TabelaTitulos>
            <L.TabelaTitulos>Qtd</L.TabelaTitulos>
            <L.ColunaEspecial>Valor(R$)</L.ColunaEspecial>
          </tr>
        </thead>
        <tbody>
          <tr>
            <L.TabelaCorpo>{dadosEmpresa.nomeEmpresa}</L.TabelaCorpo>
            <L.TabelaCorpo>{ dadosEmpresa.qtdAcoes }</L.TabelaCorpo>
            <L.TabelaCorpo>{ dadosEmpresa.valorAcao }</L.TabelaCorpo>
          </tr>
        </tbody>
      </N.Tabela>
      <N.ContainerNegociacao>
        <L.RotuloBusca htmlFor="qtd">
          Qtd de ações:
          {' '}
          <L.InputBusca type="number" value={inputValue} id="qtd" max={dadosEmpresa.qtdAcoes} onChange={showPriceAndQtd} />
        </L.RotuloBusca>
        <N.TextInfos>
          Max:
          {' '}
          {dadosEmpresa.qtdAcoes}
        </N.TextInfos>
        <N.TextInfos>
          {' '}
          Valor a ser pago:
          {' '}
          R$
          {' '}
          {valorPago.toFixed(2)}
        </N.TextInfos>
      </N.ContainerNegociacao>
      <ErroMessage>{retornoText}</ErroMessage>
      <N.Tabela>
        <CarteiraButtons type="button" disabled={ableClick} onClick={clickSell}>Comprar</CarteiraButtons>
        <CarteiraButtons type="button" onClick={() => history.push('/acoes')}>Voltar</CarteiraButtons>
      </N.Tabela>
    </div>
  );
}

export default CompraAcoes;

import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { MyContext } from '../context/Provider';
import makeSell from '../utilis/makeSell';

import { CarteiraButtons } from '../assets/styles/carteiraStyle';
import { ErroMessage } from '../assets/styles/loginStyle';
import * as N from '../assets/styles/negociacaoStyle';
import * as L from '../assets/styles/acoesStyle';

function VendaAcoes() {
  const {
    ObjNegocio, acoes, token, idSaldo, setIdSaldo, minhasAcoes,
  } = useContext(MyContext);
  const [dadosEmpresa, setDadosEmpresa] = useState({});
  const [dadosUsuário, setDadosUsuário] = useState({});
  const [inputValue, setInputValue] = useState(0);
  const [valorRecebido, setValorRecebido] = useState(0);
  const [retornoText, setRetornoText] = useState('');
  const [ableClick, setAbleClick] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const empresa = acoes.find((item) => item.id === ObjNegocio.idEmpresa);
    const user = minhasAcoes.find((item) => item.id === ObjNegocio.idEmpresa);
    setDadosEmpresa(empresa);
    setDadosUsuário(user);
  }, []);

  const showPriceAndQtd = ({ target }) => {
    const { value } = target;

    if (Number(value) < 0 || Number(value) === 0) {
      setInputValue(0);
      setRetornoText('Quantidade de Ações Inválida');
      setValorRecebido(0);
      setAbleClick(true);
    } else if (Number(value) > Number(dadosUsuário.qtdComprada)) {
      setInputValue(Number(dadosUsuário.qtdComprada));
      setRetornoText('Quantidade de Ações Máxima Ultrapassada');
      setAbleClick(true);
      const total = Number(dadosEmpresa.valorAcao) * Number(dadosUsuário.qtdComprada);
      setValorRecebido(total);
    } else {
      setInputValue(Number(value));
      setRetornoText('');
      const total = Number(dadosEmpresa.valorAcao) * Number(value);
      setValorRecebido(total);
      setAbleClick(false);
    }
  };

  const clickSell = async () => {
    setRetornoText('Aguarde...');
    const objCompra = {
      qtdVendida: Number(inputValue),
      valorVenda: valorRecebido,
    };
    const sell = await makeSell(token, ObjNegocio.idEmpresa, objCompra);

    if (sell.includes('Token' || 'Expirada')) {
      history.push('/unauthorized');
    } else {
      setRetornoText(sell);
      const total = idSaldo.saldo + valorRecebido;
      setIdSaldo(total);
      setAbleClick(true);
    }
  };

  return (
    <div>
      <N.TabelaVendas>
        <thead>
          <tr>
            <L.TabelaTitulos>Empresa</L.TabelaTitulos>
            <L.TabelaTitulos>Qtd minhas ações</L.TabelaTitulos>
            <L.ColunaEspecial>Valor total das minhas ações(R$)</L.ColunaEspecial>
          </tr>
        </thead>
        <tbody>
          <tr>
            <L.TabelaCorpo>{dadosEmpresa.nomeEmpresa}</L.TabelaCorpo>
            <L.TabelaCorpo>{ dadosUsuário.qtdComprada }</L.TabelaCorpo>
            <L.TabelaCorpo>{ dadosUsuário.valor }</L.TabelaCorpo>
          </tr>
        </tbody>
      </N.TabelaVendas>
      <N.ContainerNegociacao>
        <L.RotuloBusca htmlFor="qtd">
          Qtd de ações:
          {' '}
          <L.InputBusca type="number" value={inputValue} id="qtd" max={dadosUsuário.qtdComprada} onChange={showPriceAndQtd} />
        </L.RotuloBusca>
        <N.TextInfos>
          Max:
          {' '}
          {dadosUsuário.qtdComprada}
        </N.TextInfos>
        <N.TextInfos>
          {' '}
          Valor a ser pago:
          {' '}
          R$
          {' '}
          {valorRecebido.toFixed(2)}
        </N.TextInfos>
      </N.ContainerNegociacao>
      <ErroMessage>{retornoText}</ErroMessage>
      <N.Tabela>
        <CarteiraButtons type="button" disabled={ableClick} onClick={clickSell}>Vender</CarteiraButtons>
        <CarteiraButtons type="button" onClick={() => history.push('/acoes')}>Voltar</CarteiraButtons>
      </N.Tabela>
    </div>
  );
}

export default VendaAcoes;

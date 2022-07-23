import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { MyContext } from '../context/Provider';
import makeDeposit from '../utilis/makedeposit';

import * as L from '../assets/styles/acoesStyle';
import { InputsCarteira, CarteiraButtons } from '../assets/styles/carteiraStyle';
import { ErroMessage } from '../assets/styles/loginStyle';
import { Options } from '../assets/styles/listaAcoesStyle';

function Deposito() { // coloca dinheiro na própria conta da pessoa usuária
  const [valorDeposito, setValorDeposito] = useState(0);
  const [valorConta, setValorConta] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [ableClick, setAbleClick] = useState(true);
  const { idSaldo, setIdSaldo, token } = useContext(MyContext);
  const history = useHistory();

  const valuesInputs = ({ target }) => {
    const { id, value } = target;

    if (id === 'valorDeposito') {
      setValorDeposito(value);
      setAbleClick(true);
    } else {
      setValorConta(value);
      if (value.includes('.') && value.includes('-') && value.length <= 20) { // Referencia de numero de digitos: https://audesp.tce.sp.gov.br/faq/entry/231/#:~:text=Conforme%20XSDs%20publicados%2C%20assumimos%20que,caracter%2C%20letra%20ou%20d%C3%ADgito).
        setAbleClick(false);
        setErrorMessage('');
      } else {
        setErrorMessage('A conta deve conter até 20 digitos separados por . e -');
        setAbleClick(true);
      }
    }
  };

  const handleDeposito = async () => {
    setErrorMessage('Aguarde...');
    const objDeposito = {
      valorDeposito: Number(valorDeposito),
    };

    const text = await makeDeposit(token, objDeposito);

    if (text.includes('Token' || 'Expirada')) {
      history.push('/unauthorized');
    } else {
      setErrorMessage(text);
      const total = idSaldo.saldo + Number(valorDeposito);
      setIdSaldo(total);
      setAbleClick(true);
    }
  };

  return (
    <div>
      <InputsCarteira>
        <L.RotuloBusca htmlFor="valorDeposito">
          Valor do Depósito:
          {' '}
          <L.InputBusca type="number" step=".01" id="valorDeposito" placeholder="Digite o valor depositado" value={valorDeposito} onChange={valuesInputs} />
        </L.RotuloBusca>
        <L.RotuloBusca htmlFor="contaDeposito">
          Conta de origem do depósito:
          {' '}
          <L.InputBusca type="text" id="contaDeposito" placeholder="Digite a conta de onde vem o deposito" value={valorConta} onChange={valuesInputs} />
        </L.RotuloBusca>
      </InputsCarteira>

      <ErroMessage>{errorMessage}</ErroMessage>
      <Options>
        <CarteiraButtons type="button" disabled={ableClick} onClick={handleDeposito}>Depositar</CarteiraButtons>
        <CarteiraButtons type="button" onClick={() => history.push('/acoes')}>Voltar</CarteiraButtons>
      </Options>
    </div>
  );
}

export default Deposito;

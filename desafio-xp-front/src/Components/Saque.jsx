import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { MyContext } from '../context/Provider';
import makeWithdraw from '../utilis/makeWithdraw';

import * as L from '../assets/styles/acoesStyle';
import { InputsCarteira, CarteiraButtons } from '../assets/styles/carteiraStyle';
import { ErroMessage } from '../assets/styles/loginStyle';
import { Options } from '../assets/styles/listaAcoesStyle';

function Saque() {
  const [valorSaque, setValorSaque] = useState(0);
  const [valorConta, setValorConta] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [ableClick, setAbleClick] = useState(true);
  const { idSaldo, setIdSaldo, token } = useContext(MyContext);
  const history = useHistory();

  const valuesInputs = ({ target }) => {
    const { id, value } = target;

    if (id === 'valorSaque') {
      if (idSaldo.saldo < value) {
        setValorSaque(value);
        setErrorMessage('Saldo Insuficiente');
        setAbleClick(true);
      } else {
        setValorSaque(value);
        setErrorMessage('');
        setAbleClick(true);
      }
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

  const handleSaque = async () => {
    setErrorMessage('Aguarde...');
    const objSaque = {
      valorSaque: Number(valorSaque),
    };

    const text = await makeWithdraw(token, objSaque);

    if (text.includes('Token' || 'Expirada')) {
      history.push('/unauthorized');
    } else {
      setErrorMessage(text);
      const total = idSaldo.saldo - Number(valorSaque);
      setIdSaldo(total);
      setAbleClick(true);
    }
  };

  return (
    <div>
      <InputsCarteira>
        <L.RotuloBusca htmlFor="valorSaque">
          Valor do Saque:
          {' '}
          <L.InputBusca type="number" step=".01" id="valorSaque" placeholder="Digite o valor sacado" value={valorSaque} onChange={valuesInputs} />
        </L.RotuloBusca>
        <L.RotuloBusca htmlFor="contaSaque">
          Conta de destino do saque:
          {' '}
          <L.InputBusca type="text" id="contaSaque" placeholder="Digite a conta para onde vai o saque" value={valorConta} onChange={valuesInputs} />
        </L.RotuloBusca>
      </InputsCarteira>

      <ErroMessage>{errorMessage}</ErroMessage>
      <Options>
        <CarteiraButtons type="button" disabled={ableClick} onClick={handleSaque}>Sacar</CarteiraButtons>
        <CarteiraButtons type="button" onClick={() => history.push('/acoes')}>Voltar</CarteiraButtons>
      </Options>

    </div>
  );
}

export default Saque;

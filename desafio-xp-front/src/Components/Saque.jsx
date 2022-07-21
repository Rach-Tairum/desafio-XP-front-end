import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { MyContext } from '../context/Provider';
import makeWithdraw from '../utilis/makeWithdraw';

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
      } else {
        setValorSaque(value);
        setErrorMessage('');
      }
    } else {
      setValorConta(value);
      if (value.includes('.') && value.includes('-') && value.length <= 20) { // Referencia de numero de digitos: https://audesp.tce.sp.gov.br/faq/entry/231/#:~:text=Conforme%20XSDs%20publicados%2C%20assumimos%20que,caracter%2C%20letra%20ou%20d%C3%ADgito).
        setAbleClick(false);
        setErrorMessage('');
      } else {
        setErrorMessage('A conta deve conter até 20 digitos separados por . e -');
      }
    }
  };

  const handleSaque = async () => {
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
    }
  };

  return (
    <div>
      <label htmlFor="valorSaque">
        Valor do Saque:
        {' '}
        <input type="number" step=".01" id="valorSaque" placeholder="Digite o valor sacado" value={valorSaque} onChange={valuesInputs} />
      </label>
      <label htmlFor="contaSaque">
        Conta de destino do saque:
        {' '}
        <input type="text" id="contaSaque" placeholder="Digite a conta para onde vai o saque" value={valorConta} onChange={valuesInputs} />
      </label>
      <p>{errorMessage}</p>
      <button type="button" disabled={ableClick} onClick={handleSaque}>Sacar</button>
      <button type="button" onClick={() => history.push('/acoes')}>Voltar</button>
    </div>
  );
}

export default Saque;
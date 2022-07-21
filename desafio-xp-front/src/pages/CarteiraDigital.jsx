import React, { useState } from 'react';
import Deposito from '../Components/Deposito';
import Header from '../Components/Header';
import Saque from '../Components/Saque';

function CarteiraDigital() {
  const [visibility, setVisibility] = useState('saque');
  return (
    <div>
      <Header />
      <h2>Carteira Digital</h2>
      <div>
        <button type="button" onClick={() => setVisibility('deposito')}>Deposito</button>
        <button type="button" onClick={() => setVisibility('saque')}>Saque</button>
      </div>
      {visibility === 'saque' ? <Saque /> : <Deposito />}
    </div>
  );
}

export default CarteiraDigital;

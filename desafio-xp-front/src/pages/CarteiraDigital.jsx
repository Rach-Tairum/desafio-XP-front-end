import React, { useState } from 'react';
import Deposito from '../Components/Deposito';
import Header from '../Components/Header';
import Saque from '../Components/Saque';

import { TituloCarteira, ContainerCarteira } from '../assets/styles/carteiraStyle';
import * as A from '../assets/styles/listaAcoesStyle';

function CarteiraDigital() {
  const [visibility, setVisibility] = useState('saque');
  return (
    <div>
      <Header />
      <ContainerCarteira>
        <TituloCarteira>Carteira Digital</TituloCarteira>
        <A.Options>
          <A.ButtonOption type="button" onClick={() => setVisibility('deposito')}>Deposito</A.ButtonOption>
          <A.ButtonOption type="button" onClick={() => setVisibility('saque')}>Saque</A.ButtonOption>
        </A.Options>
        {visibility === 'saque' ? <Saque /> : <Deposito />}
      </ContainerCarteira>
    </div>
  );
}

export default CarteiraDigital;

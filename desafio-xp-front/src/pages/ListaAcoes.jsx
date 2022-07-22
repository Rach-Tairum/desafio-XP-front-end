import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Acoes from '../Components/Acoes';
import Header from '../Components/Header';
import MinhasAcoes from '../Components/MinhasAcoes';

import * as A from '../assets/styles/listaAcoesStyle';

function ListaAcoes() {
  const [visibility, setVisibility] = useState('all');
  const history = useHistory();

  return (
    <div>
      <Header />
      <A.LayoutAcoes>
        <A.TituloAcao>Ações</A.TituloAcao>
        <A.Options>
          <A.ButtonOption type="button" onClick={() => setVisibility('mine')}>Minhas Ações</A.ButtonOption>
          <A.ButtonOption type="button" onClick={() => setVisibility('all')}>Lista de ações</A.ButtonOption>
        </A.Options>
        {visibility === 'all' ? <Acoes /> : <MinhasAcoes />}
        <A.CarteiraButton type="button" onClick={() => history.push('/carteira')}>Carteira Digital</A.CarteiraButton>
      </A.LayoutAcoes>
    </div>
  );
}

export default ListaAcoes;

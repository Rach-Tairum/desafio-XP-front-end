import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Acoes from '../Components/Acoes';
import Header from '../Components/Header';
import MinhasAcoes from '../Components/MinhasAcoes';
import { MyContext } from '../context/Provider';

import * as A from '../assets/styles/listaAcoesStyle';
import validateToken from '../utilis/validateToken';

function ListaAcoes() {
  const { token } = useContext(MyContext);
  const [visibility, setVisibility] = useState('all');
  const history = useHistory();

  const validUser = async () => {
    const message = await validateToken(token);

    if (message !== 'OK') {
      history.push('/unauthorized');
    } else {
      history.push('/carteira');
    }
  };

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
        <A.CarteiraButton type="button" onClick={validUser}>Carteira Digital</A.CarteiraButton>
      </A.LayoutAcoes>
    </div>
  );
}

export default ListaAcoes;

import React, { useState } from 'react';
import Acoes from '../Components/Acoes';
import Header from '../Components/Header';
import MinhasAcoes from '../Components/MinhasAcoes';

function ListaAcoes() {
  const [visibility, setVisibility] = useState('all');

  return (
    <div>
      <Header />
      <h1>Ações</h1>
      <div>
        <button type="button" onClick={() => setVisibility('mine')}>Minhas Ações</button>
        <button type="button" onClick={() => setVisibility('all')}>Lista de ações</button>
      </div>
      {visibility === 'all' ? <Acoes /> : <MinhasAcoes />}
    </div>
  );
}

export default ListaAcoes;

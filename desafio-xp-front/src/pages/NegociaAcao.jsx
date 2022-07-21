import React, { useContext } from 'react';
import CompraAcoes from '../Components/CompraAcoes';
import Header from '../Components/Header';
import VendaAcoes from '../Components/VendaAcoes';
import { MyContext } from '../context/Provider';

function NegociaAcao() {
  const { ObjNegocio } = useContext(MyContext);

  return (
    <div>
      <Header />
      <h2>Negociação de ações</h2>
      {ObjNegocio.tipoNegocio === 'compra' ? <CompraAcoes /> : <VendaAcoes />}
    </div>
  );
}

export default NegociaAcao;

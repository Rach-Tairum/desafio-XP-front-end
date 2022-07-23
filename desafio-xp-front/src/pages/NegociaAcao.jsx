import React, { useContext } from 'react';
import CompraAcoes from '../Components/CompraAcoes';
import Header from '../Components/Header';
import VendaAcoes from '../Components/VendaAcoes';
import { MyContext } from '../context/Provider';

import { ContainerCarteira } from '../assets/styles/carteiraStyle';
import { TituloNegociacao } from '../assets/styles/negociacaoStyle';

function NegociaAcao() {
  const { ObjNegocio } = useContext(MyContext);

  return (
    <div>
      <Header />
      <ContainerCarteira>
        <TituloNegociacao>Negociação de Ações</TituloNegociacao>
        {ObjNegocio.tipoNegocio === 'compra' ? <CompraAcoes /> : <VendaAcoes />}
      </ContainerCarteira>
    </div>
  );
}

export default NegociaAcao;

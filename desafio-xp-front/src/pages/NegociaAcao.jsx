import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import CompraAcoes from '../Components/CompraAcoes';
import Header from '../Components/Header';
import { MyContext } from '../context/Provider';
import validateToken from '../utilis/validateToken';

function NegociaAcao() {
  const {
    token, ObjNegocio,
  } = useContext(MyContext);
  const history = useHistory();

  useEffect(() => {
    const getInfos = async () => {
      const message = await validateToken(token);

      if (message !== 'OK') {
        history.push('/unauthorized');
      }
    };
    getInfos();
  }, []);

  return (
    <div>
      <Header />
      <h2>Negociação de ações</h2>
      {ObjNegocio.tipoNegocio === 'compra' ? <CompraAcoes /> : }
    </div>
  );
}

export default NegociaAcao;

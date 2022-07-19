/* eslint-disable react/prop-types */
import React, { createContext, useState } from 'react';

export const MyContext = createContext();

function Provider({ children }) {
  const [token, setToken] = useState('');
  const [idSaldo, setIdSaldo] = useState({});
  const [acoes, setAcoes] = useState([]);
  const [ObjNegocio, setObjNegocio] = useState({});

  const negocia = (idEmpresa, negociacao) => {
    const saveObj = {
      idEmpresa,
      tipoNegocio: negociacao,
    };
    setObjNegocio(saveObj);
  };

  const contextValues = {
    token,
    setToken,
    idSaldo,
    setIdSaldo,
    acoes,
    setAcoes,
    ObjNegocio,
    negocia,
  };

  return (
    <MyContext.Provider value={contextValues}>
      { children }
    </MyContext.Provider>
  );
}

export default Provider;

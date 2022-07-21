/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/prop-types */
import React, { createContext, useState } from 'react';
import getAllAcoes from '../utilis/getAllAcoes';
import getUserAcoes from '../utilis/getUserAcoes';
import getUserInfos from '../utilis/getUserInfos';

export const MyContext = createContext();

function Provider({ children }) {
  const [token, setToken] = useState('');
  const [name, setName] = useState('');
  const [idSaldo, setIdSaldo] = useState({});
  const [acoes, setAcoes] = useState([]);
  const [filterAcoes, setFilterAcoes] = useState([]);
  const [minhasAcoes, setMinhasAcoes] = useState([]);
  const [ObjNegocio, setObjNegocio] = useState({});

  const getInfos = async () => {
    await getAllAcoes(setAcoes, setFilterAcoes);
  };

  const getMyInfos = async () => {
    await getUserAcoes(setMinhasAcoes, acoes, idSaldo);
  };

  const getPersonInfos = async () => {
    await getUserInfos(setName, setIdSaldo);
  };

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
    filterAcoes,
    setFilterAcoes,
    getInfos,
    minhasAcoes,
    setMinhasAcoes,
    getMyInfos,
    ObjNegocio,
    negocia,
    getPersonInfos,
    name,
  };

  return (
    <MyContext.Provider value={contextValues}>
      { children }
    </MyContext.Provider>
  );
}

export default Provider;

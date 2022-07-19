/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React, { createContext, useState } from 'react';

export const MyContext = createContext();

function Provider({ children }) {
  const [token, setToken] = useState('');
  const [saldo, setSaldo] = useState('');

  const contextValues = {
    token,
    setToken,
    saldo,
    setSaldo,
  };

  return (
    <MyContext.Provider value={contextValues}>
      { children }
    </MyContext.Provider>
  );
}

export default Provider;

import React, { createContext, useState } from 'react';

export const MyContext = createContext();

function Provider({ children }) {
  const [token, setToken] = useState('');

  const contextValues ={
    token,
    setToken,
  }

  console.log(token);

  return (
    <MyContext.Provider value={ contextValues }>
      { children }
    </MyContext.Provider>
  )
}

export default Provider;
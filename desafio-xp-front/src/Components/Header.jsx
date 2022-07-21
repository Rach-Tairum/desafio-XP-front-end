/* eslint-disable react/jsx-filename-extension */
import React, { useContext, useEffect } from 'react';
import { MyContext } from '../context/Provider';

function Header() {
  const { idSaldo, name, getPersonInfos } = useContext(MyContext);

  useEffect(() => {
    getPersonInfos();
  }, [idSaldo]);
  return (
    <div>
      <h3>{ name }</h3>
      <h3>{ idSaldo.saldo }</h3>
    </div>
  );
}

export default Header;

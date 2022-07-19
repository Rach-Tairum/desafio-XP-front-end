/* eslint-disable react/jsx-filename-extension */
import React, { useContext, useEffect, useState } from 'react';
import { MyContext } from '../context/Provider';
import getUserInfos from '../utilis/getUserInfos';

function Header() {
  const [name, setName] = useState('');
  const { idSaldo, setIdSaldo } = useContext(MyContext);

  useEffect(() => {
    const getInfos = async () => {
      await getUserInfos(setName, setIdSaldo);
    };
    getInfos();
  }, [setIdSaldo]);
  return (
    <div>
      <h3>{ name }</h3>
      <h3>{ idSaldo.saldo }</h3>
    </div>
  );
}

export default Header;

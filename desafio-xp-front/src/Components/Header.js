/* eslint-disable react/jsx-filename-extension */
import React, { useContext, useEffect, useState } from 'react';
import { MyContext } from '../context/Provider';
import getUserInfos from '../utilis/getUserInfos';

function Header() {
  const [name, setName] = useState('');
  const { saldo, setSaldo } = useContext(MyContext);

  useEffect(() => {
    const getInfos = async () => {
      await getUserInfos(setName, setSaldo);
    };
    getInfos();
  }, [setSaldo]);
  return (
    <div>
      <h3>{ name }</h3>
      <h3>{ saldo }</h3>
    </div>
  );
}

export default Header;

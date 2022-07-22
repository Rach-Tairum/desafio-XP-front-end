/* eslint-disable react/jsx-filename-extension */
import React, { useContext, useEffect } from 'react';
import { MyContext } from '../context/Provider';
import { Cabecalho, NomeSaldo } from '../assets/styles/headerStyle';

function Header() {
  const { idSaldo, name, getPersonInfos } = useContext(MyContext);

  useEffect(() => {
    getPersonInfos();
  }, [idSaldo]);
  return (
    <Cabecalho>
      <NomeSaldo>
        Olá,
        {' '}
        { name }

      </NomeSaldo>
      <NomeSaldo>
        Saldo:
        {' '}
        { idSaldo.saldo }
      </NomeSaldo>
    </Cabecalho>
  );
}

export default Header;

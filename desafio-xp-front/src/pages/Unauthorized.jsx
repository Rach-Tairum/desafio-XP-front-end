import React from 'react';
import { Link } from 'react-router-dom';

import {
  ContainerPage, TitlePage, SubtitlePage, ButtonVolta,
} from '../assets/styles/unauthorizedStyle';

function Unauthorized() {
  return (
    <ContainerPage>
      <TitlePage>Seção expirada</TitlePage>
      <SubtitlePage>Favor fazer novo login e conseguir uma nova autenticação</SubtitlePage>
      <Link to="/">
        <ButtonVolta type="button"> Voltar ao Login </ButtonVolta>
      </Link>
    </ContainerPage>
  );
}

export default Unauthorized;

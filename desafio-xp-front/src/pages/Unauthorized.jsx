import React from 'react';
import { Link } from 'react-router-dom';

function Unauthorized() {
  return (
    <div>
      <h1>Seção expirada</h1>
      <h4>Favor fazer novo login e iniciar uma nova seção</h4>
      <Link to="/">
        <button type="button"> Voltar ao Login </button>
      </Link>
    </div>
  );
}

export default Unauthorized;

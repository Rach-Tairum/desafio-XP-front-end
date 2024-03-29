/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Loading from '../Components/Loading';
import { MyContext } from '../context/Provider';

import * as R from '../assets/styles/loginStyle';

function Login() {
  const history = useHistory();
  const { setToken } = useContext(MyContext);
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setpasswordValue] = useState('');
  const [validEmail, setValidemail] = useState(false);
  const [passVisibility, setPassVisibility] = useState('password');
  const [errorMessage, setErrorMessage] = useState('');
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    const email = localStorage.getItem('userXP');
    const objInfos = JSON.parse(email);

    if (email) {
      setEmailValue(objInfos.email);
    }
  }, []);

  const textError = (email) => {
    const re = /\S+@\S+\.\S+/; // referência: https://www.horadecodar.com.br/2020/09/13/como-validar-email-com-javascript/
    const validation = re.test(email); // referência: https://www.horadecodar.com.br/2020/09/13/como-validar-email-com-javascript/
    if (validation) {
      setValidemail(false);
    } else {
      setValidemail(true);
    }
  };
  const handleInput = ({ target }) => {
    const { id, value } = target;

    if (id === 'input') {
      setEmailValue(value);
      textError(value);
    } else {
      setpasswordValue(value);
    }
  };

  const clickVisibility = () => { // Referência: https://www.horadecodar.com.br/2020/03/26/como-fazer-input-de-password-com-olho-de-mostrar-senha/
    if (passVisibility === 'password') {
      setPassVisibility('text');
    } else {
      setPassVisibility('password');
    }
  };

  const clickButton = async () => {
    const objPost = {
      email: emailValue,
      password: passwordValue,
    };

    const objLocal = {
      email: emailValue,
      time: Date(),
    };

    const stringObj = JSON.stringify(objLocal);

    localStorage.setItem('userXP', stringObj);

    setCarregando(true);

    const url = 'https://back-api-desafio.herokuapp.com/login';

    await axios.post(url, objPost).then((response) => {
      setErrorMessage('');
      const { token } = response.data;
      setToken(token);
      setCarregando(false);
      history.push('/acoes');
    }).catch((error) => {
      setErrorMessage(error.response.data.message);
      setCarregando(false);
    });
  };

  return (
    carregando ? <Loading />
      : (
        <R.Container>
          <R.Box>
            <R.Title>Login</R.Title>
            <R.Formulário>
              <R.Rotulo htmlFor="input">
                Email:
                {' '}
                <R.Input type="email" placeholder="Digite seu e-mail" value={emailValue} id="input" onChange={handleInput} />
              </R.Rotulo>
              {validEmail && <R.ErroMessage>Email Inválido</R.ErroMessage> }
              <R.Senha>
                <R.Rotulo htmlFor="pass">
                  Senha:
                  {' '}
                  <R.Input type={passVisibility} placeholder="Digite sua senha" value={passwordValue} id="pass" onChange={handleInput} />
                </R.Rotulo>
                <R.Icon className="material-icons" onClick={clickVisibility}> visibility </R.Icon>
              </R.Senha>

              {' '}
              <R.Entrar
                type="button"
                disabled={!(!validEmail && passwordValue.length > 1)}
                onClick={clickButton}
              >
                Entrar
              </R.Entrar>
              <R.ErroMessage data-testid="error">{ errorMessage }</R.ErroMessage>
            </R.Formulário>
          </R.Box>

        </R.Container>
      )
  );
}

export default Login;

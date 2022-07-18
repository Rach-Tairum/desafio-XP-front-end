import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

function Login() {
  const history = useHistory();
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setpasswordValue] = useState("");
  const [validEmail, setValidemail] = useState(false);
  const [passVisibility, setPassVisibility] = useState("password");
  const [token, setToken] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const textError = (email) => {
    const re = /\S+@\S+\.\S+/; // referência: https://www.horadecodar.com.br/2020/09/13/como-validar-email-com-javascript/
    const validation = re.test(email); // referência: https://www.horadecodar.com.br/2020/09/13/como-validar-email-com-javascript/
    validation ? setValidemail(false) : setValidemail(true)
  }
  const handleInput = ({ target }) => {
    const { id, value } = target;

    if (id === "input") {
      setEmailValue(value);
      textError(value);
    } else {
      setpasswordValue(value);
    }
  }

  const clickVisibility = () => { // Referência: https://www.horadecodar.com.br/2020/03/26/como-fazer-input-de-password-com-olho-de-mostrar-senha/
    passVisibility === 'password' ? setPassVisibility('text') : setPassVisibility('password')
  }

  const clickButton = async () => {
    const objPost = {
      email: emailValue,
      password: passwordValue
    };

    const url = 'https://back-api-desafio.herokuapp.com/login'
    
    await axios.post(url, objPost).then((response) => {
      setToken(response)
      setErrorMessage("")
      history.push('/acoes')
    }).catch(function (error) {
      setErrorMessage(error.response.data.message)
    });
  }

  return (
    <div>
      <h1>Login</h1>
      <label>
        Email:
        <input type="email" placeholder="Digite seu e-mail" value={ emailValue } id="input" onChange={ handleInput } />
      </label>
      {validEmail && <p>Email Inválido</p> }
      <label>
        Senha:
        <input type={ passVisibility } placeholder="Digite sua senha" value={ passwordValue } id="pass" onChange={ handleInput } />
        {' '}
        <span className="material-icons" onClick={ clickVisibility }> visibility </span>
      </label>
      {' '}
      <button 
      type="button" 
      disabled={ !(!validEmail && passwordValue.length > 1) }
      onClick={ clickButton }> 
        Entrar 
      </button>
      <p>{ errorMessage }</p>
    </div>
  );
}

export default Login;

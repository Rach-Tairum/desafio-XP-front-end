import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import axios from 'axios';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import Provider from '../context/Provider';

// jest.mock('axios', () => ({
//   ...jest.requireActual('axios'),
//   post: jest.fn(),
// }));

describe('Verifica se a tela Login foi renderizada corretamente', () => {
  // Referencia: https://www.samdawson.dev/article/react-context-testing
  const allFunctions = {
    token: '',
    setToken: jest.fn(),

  };
  beforeEach(() => {
    render(
      <Provider value={allFunctions}>
        <App />
      </Provider>,
    );
  });

  it('Testa se existe um titulo "Login" na página', () => {
    renderWithRouter(<App />);
    const title = screen.getAllByRole('heading', { level: 1, name: 'Login' });

    expect(title[0]).toBeInTheDocument();
    expect(title[0].innerHTML).toBe('Login');
  });

  it('Testa se existem dois inputs, um de em-mail e um de senha', () => {
    renderWithRouter(<App />);
    const inputEmail = screen.getAllByLabelText('Email:');
    const inputSenha = screen.getAllByLabelText('Senha:');

    expect(inputEmail[0]).toBeInTheDocument();
    expect(inputSenha[0]).toBeInTheDocument();
    expect(inputEmail[0].type).toBe('email');
    expect(inputSenha[0].type).toBe('password');
  });

  it('Testa se existe um icone de visualização de senha', () => {
    renderWithRouter(<App />);
    const icon = screen.getAllByText('visibility');

    expect(icon[0]).toBeInTheDocument();
  });

  it('Testa se existe um botão de entrar e ele está desabilitado', () => {
    renderWithRouter(<App />);
    const button = screen.getAllByRole('button', { name: 'Entrar' });

    expect(button[0]).toBeInTheDocument();
    expect(button[0]).toBeDisabled();
  });
});

describe('Verifica funcionalidades da tela de login', () => {
  // Referencia: https://www.samdawson.dev/article/react-context-testing
  const allFunctions = {
    token: '',
    setToken: jest.fn(),

  };
  beforeEach(() => {
    render(
      <Provider value={allFunctions}>
        <App />
      </Provider>,
    );
  });

  it('Verifica se o input email recebe valores', () => {
    renderWithRouter(<App />);
    const inputEmail = screen.getAllByLabelText('Email:');

    expect(inputEmail[0]).toHaveValue('');
    userEvent.type(inputEmail[0], 'teste@teste.com');
    expect(inputEmail[0]).toHaveValue('teste@teste.com');
  });
  it('Verifica se o input recebendo valores que não são email retorna erro', () => {
    renderWithRouter(<App />);
    const inputEmail = screen.getAllByLabelText('Email:');

    expect(inputEmail[0]).toHaveValue('');
    userEvent.type(inputEmail[0], 'teste');
    const errorMessage = screen.getByText('Email Inválido');
    expect(inputEmail[0]).toHaveValue('teste');
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage.innerHTML).toBe('Email Inválido');
  });
  it('Verifica se o input recebendo valores que não são email mas com ".com" retorna erro', () => {
    renderWithRouter(<App />);
    const inputEmail = screen.getAllByLabelText('Email:');

    expect(inputEmail[0]).toHaveValue('');
    userEvent.type(inputEmail[0], 'teste.teste.com');
    expect(inputEmail[0]).toHaveValue('teste.teste.com');
    const errorMessage = screen.getByText('Email Inválido');
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage.innerHTML).toBe('Email Inválido');
  });

  it('Verifica se o input recebendo valores que não são e-mail mas com "@" retorna erro', () => {
    renderWithRouter(<App />);
    const inputEmail = screen.getAllByLabelText('Email:');

    userEvent.type(inputEmail[0], 'teste@teste');
    expect(inputEmail[0]).toHaveValue('teste@teste');
    const errorMessage = screen.getByText('Email Inválido');
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage.innerHTML).toBe('Email Inválido');
  });

  it('Verifica se o input senha recebe valores', () => {
    renderWithRouter(<App />);
    const inputSenha = screen.getAllByLabelText('Senha:');

    expect(inputSenha[0]).toHaveValue('');
    userEvent.type(inputSenha[0], '123456');
    expect(inputSenha[0]).toHaveValue('123456');
  });

  it('Verifica se a senha fica visivel clicando no icone de olho', () => {
    renderWithRouter(<App />);
    const icon = screen.getAllByText('visibility');
    const inputSenha = screen.getAllByLabelText('Senha:');

    expect(inputSenha[0]).toHaveValue('');
    expect(inputSenha[0].type).toBe('password');
    userEvent.type(inputSenha[0], '123456');
    expect(inputSenha[0]).toHaveValue('123456');
    expect(inputSenha[0].type).toBe('password');
    userEvent.click(icon[0]);
    expect(inputSenha[0]).toHaveValue('123456');
    expect(inputSenha[0].type).toBe('text');
  });

  it('Verifica se o botão foi habilitado', () => {
    renderWithRouter(<App />);
    const inputEmail = screen.getAllByLabelText('Email:');
    const inputSenha = screen.getAllByLabelText('Senha:');
    const button = screen.getAllByRole('button', { name: 'Entrar' });

    userEvent.type(inputEmail[0], 'teste@teste.com');
    userEvent.type(inputSenha[0], '12345678');
    expect(button[0]).not.toBeDisabled();
  });
});

// describe('Verifica realização do login', () => {
//   const allFunctions = {
//     token: '',
//     setToken: jest.fn(),

//   };
//   beforeEach(() => {
//     render(
//       <Provider value={allFunctions}>
//         <App />
//       </Provider>,
//     );
//   });

//   afterEach(() => jest.clearAllMocks());

//   it('Verifica se o login pode ser realizado com sucesso', async () => {
//  // referências: https://testing-library.com/docs/dom-testing-library/api-async
//  // https://www.youtube.com/watch?v=5nzoYEjvgRc
//  // https://www.youtube.com/watch?v=Ngj2f1n9pUw
//  // https://stackoverflow.com/questions/69574437/mocking-an-axios-post-using-react-testing-library-jest
//     // const TOKEN = { token: 'abcd1234567' };

//     // const objPost = {
//     //   email: 'teste@teste.com',
//     //   password: '12345678',
//     // };

//     // mokedAxios.post.mockResolvedValueOnce({ data: { token: TOKEN } });

//     // const url = 'https://back-api-desafio.herokuapp.com/login';
//     const { history } = renderWithRouter(<App />);
//     const inputEmail = screen.getAllByLabelText('Email:');
//     const inputSenha = screen.getAllByLabelText('Senha:');
//     const button = screen.getAllByRole('button', { name: 'Entrar' });

//     userEvent.type(inputEmail[0], 'joao.xp@teste.com');
//     userEvent.type(inputSenha[0], 'euEstiveAqui');
//     userEvent.click(button[0]);
//     const { pathname } = await history.location;

//     expect(axios.post).toHaveBeenCalledWith(url, objPost);
//     expect(axios.post).toHaveBeenCalledTimes(1);
//     expect(pathname).toBe('/acoes');
//   });
// });

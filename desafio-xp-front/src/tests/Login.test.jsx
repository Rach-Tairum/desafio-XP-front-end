import React from 'react';
import { screen, render } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import App from '../App';
// import Login from '../pages/Login';
import renderWithRouter from './renderWithRouter';
import Provider from '../context/Provider';

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

  it('Testa se existe um botão de entrar', () => {
    renderWithRouter(<App />);
    const button = screen.getAllByRole('button', { name: 'Entrar' });

    expect(button[0]).toBeInTheDocument();
  });
});

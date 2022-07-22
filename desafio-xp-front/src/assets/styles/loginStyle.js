import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`;

export const Title = styled.h1`
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  width: 22vw;
  height: 20vh;
  text-align: center;
  font-size: 4vw;
`;

export const Senha = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  align-content: center;
  justify-content: center;
`;

export const Box = styled.div`
  background-color: #FFFFAD;
  padding: 100px 50px;
  border-radius: 50px;
  border: 2px solid black;
  box-shadow: 8px 8px 10px black;
`;

export const Formulário = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Rotulo = styled.label`
  @import url('https://fonts.googleapis.com/css2?family=Prompt:wght@200&display=swap');
  font-family: Prompt ;
  font-size: 1.5vw;
  padding: 10px;
`;

export const Input = styled.input`
@import url('https://fonts.googleapis.com/css2?family=Prompt:wght@200&display=swap');
  font-family: Prompt ;
  font-weight: 600;
  padding: 10px 20px;
  border-radius: 10px;
  font-size: 0.9vw;
  margin-right: 5px;
`;

export const Icon = styled.span`
  font-size: 1.7vw;
  padding-left: 4px;
  cursor: pointer;
`;

export const Entrar = styled.button`
  width: 8vw;
  height: 5vh;
  margin: 20px;
  margin-top: 50px;
  font-size: 1.2vw;
  border-radius: 30px;
  background-color: black;
  color: rgb(255, 255, 255);

  &:disabled {
    background-color: rgb(0,0,0, 0.68);
    color: rgb(255, 255, 255, 0.68);
  }
`;

export const ErroMessage = styled.p`
  font-size: 1.3vw;
  color: #EB0000;
  font-weight: 550;
  margin-top: 10px;
`;

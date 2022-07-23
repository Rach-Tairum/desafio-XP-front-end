import styled from 'styled-components';

export const TituloCarteira = styled.h2`
font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
width: 22vw;
height: 100vh;
text-align: center;
font-size: 3vw;
margin-top: 400px;
`;

export const RotuloValor = styled.label`
  @import url('https://fonts.googleapis.com/css2?family=Prompt:wght@200&display=swap');
  font-family: Prompt ;
  font-size: 1.5vw;
  padding: 10px;
`;

export const InputConta = styled.input`
@import url('https://fonts.googleapis.com/css2?family=Prompt:wght@200&display=swap');
  font-family: Prompt ;
  font-weight: 600;
  padding: 10px 20px;
  border-radius: 10px;
  font-size: 0.9vw;
  margin-right: 5px;
`;

export const ContainerCarteira = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 15vh;
`;

export const InputsCarteira = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const CarteiraButtons = styled.button`
  width: 12vw;
  height: 6vh;
  margin: 8px;
  margin-top: 50px;
  margin-left: 55px;
  font-size: 1.2vw;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  border-radius: 30px;
  background-color: black;
  color: rgb(255, 255, 255);
  padding: 10px;

  &:disabled {
    background-color: rgb(0,0,0, 0.68);
    color: rgb(255, 255, 255, 0.68);
  }
`;

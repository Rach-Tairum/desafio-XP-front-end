import styled from 'styled-components';

export const LayoutAcoes = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 80vh;
`;

export const TituloAcao = styled.h1`
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  width: 22vw;
  height: 10vh;
  text-align: center;
  font-size: 3vw;
  margin-top: 250px;
`;

export const Options = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 10px;
`;

export const ButtonOption = styled.button`
  width: 10vw;
  height: 5vh;
  margin: 20px;
  margin-top: 50px;
  font-size: 1.2vw;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  border-radius: 30px;
  background-color: #576E75;
  color: rgb(255, 255, 255);
`;

export const CarteiraButton = styled.button`
  width: 12vw;
  height: 30vh;
  margin: 5px;
  margin-top: 50px;
  font-size: 1.2vw;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  border-radius: 30px;
  background-color: black;
  color: rgb(255, 255, 255);
  padding: 10px;
`;

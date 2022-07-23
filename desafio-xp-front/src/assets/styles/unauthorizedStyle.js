import styled from 'styled-components';

export const ContainerPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 80vh;
`;

export const TitlePage = styled.h1`
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  width: 50vw;
  height: 20vh;
  text-align: center;
  font-size: 4vw;
`;

export const SubtitlePage = styled.h4`
  font-size: 1.5vw;
  color: #EB0000;
  font-weight: 550;
  margin-top: 10px;
  text-align: center;
`;

export const ButtonVolta = styled.button`
  width: 15vw;
  height: 6vh;
  margin: 20px;
  margin-top: 50px;
  font-size: 1.2vw;
  border-radius: 30px;
  background-color: black;
  color: rgb(255, 255, 255);
`;

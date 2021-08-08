import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  padding: 0 30%;
  text-align: center;
  background-image: url("./background.jpg");
  background-repeat: no-repeat;
  background-size: cover;

  h1 {
    color: white;
    font-size: 10rem;
    margin-bottom: 50px;
    font-family: 'Permanent Marker', cursive;
    font-weight: 100;
  }

  p {
    font-weight: bold;
    font-size: 5rem;
    margin: 10px 0;
  }

  a {
    margin-top: 50px;
  }

`;

export const Button = styled.button`
  width: 375px;
  text-align: center;
  background-color: white;
  border: none;
  padding: 10px 30px;
  height: 80px;
  border-radius: 50px;
  font-size: 3rem;
  font-family: 'Permanent Marker', cursive;
  font-weight: 100;
  -webkit-box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.3);
  -moz-box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.3);
  box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.3);
  transition: 200ms all;

  &:hover{
    -webkit-box-shadow: 0px 0px 15px 0px rgba(0,0,0,0.7);
  -moz-box-shadow: 0px 0px 15px 0px rgba(0,0,0,0.7);
  box-shadow: 0px 0px 15px 0px rgba(0,0,0,0.7);
  }
`;
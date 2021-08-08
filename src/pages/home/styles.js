import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  padding: 0 30%;
  text-align: center;
  background-image: url("./colors.jpg");
  background-repeat: no-repeat;
  background-size: cover;

  img {
    height: 100vh;
    position: absolute;
    opacity: 0.7;
    z-index:0;
  }
  h1 {
    color: white;
    font-size: 10rem;
    margin-bottom: 50px;
    z-index:1;
    font-weight: 100;
    font-family: 'Permanent Marker', cursive;
  }

  p {
    font-size: 3rem;
    margin: 10px 0;
    font-weight: 500;
    z-index:1;
    background-color: rgba(243, 157, 18, 0.7);
    padding: 5px 15px;
    border-radius: 2px;
  }

  a {
    z-index:1;
    margin-top: 50px;
  }
`;

export const Button = styled.button`
  text-align: center;
  background-color: white;
  border: none;
  width: 300px;
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
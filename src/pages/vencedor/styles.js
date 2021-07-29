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
  text-align: center;
  background-color: white;
  border: none;
  width: 300px;
  height: 80px;
  border-radius: 50px;
  font-size: 3rem;
  font-weight: bold;
  -webkit-box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.3);
  -moz-box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.3);
  box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.3);
  transition: 200ms all;

  &:hover{
    color: white;
    background: rgb(65,237,41);
    background: linear-gradient(90deg, rgba(65,237,41,0.989233193277311) 13%, rgba(12,31,230,1) 70%, rgba(233,8,156,1) 93%);
}
`;
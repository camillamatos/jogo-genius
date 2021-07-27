import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  padding: 0 30%;
  text-align: center;
  background: rgb(12,31,230);
  background: linear-gradient(90deg, rgba(12,31,230,1) 0%, rgba(65,237,41,0.989233193277311) 35%, rgba(233,8,156,1) 100%);

  h1 {
    color: white;
    font-size: 10rem;
    margin-bottom: 50px;
  }

  p {
    font-size: 3rem;
    margin: 10px 0;
  }

`;

export const Button = styled.button`
  text-align: center;
  background-color: white;
  border: 3px solid linear-gradient(90deg, rgba(12,31,230,1) 0%, rgba(65,237,41,0.989233193277311) 35%, rgba(233,8,156,1) 100%);
  width: 300px;
  height: 80px;
  border-radius: 50px;
  font-size: 3rem;
  margin-top: 50px;
  font-weight: bold;

  &:hover{
    color: white;
    background: rgb(65,237,41);
    background: linear-gradient(90deg, rgba(65,237,41,0.989233193277311) 13%, rgba(12,31,230,1) 70%, rgba(233,8,156,1) 93%);
}
`;
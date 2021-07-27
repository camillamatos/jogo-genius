import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
 
  h1 {
    font-size: 5rem;
    margin: 70px 0;
  }
`;
export const Color = styled.div`
  background-color: ${props => props.color};
  width: 400px;
  height: 400px;
`;
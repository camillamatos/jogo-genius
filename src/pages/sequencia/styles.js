import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;

  div.blocks {
    width: 90vw;
    justify-content: space-between;
    display: flex;
  }
 
  h1 {
    font-size: 5rem;
    margin: 70px 0;
  }

  p {
    font-size: 4rem;
  }
`;

export const Color = styled.div`
  background-color: ${props => props.color};
  opacity: ${props => props.color === props.atual ? '1' : '0.2' };
  height: 400px;
  width: 20vw;
  transition: 150ms all;
`;
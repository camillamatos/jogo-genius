import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;

  video, #mapa-movimento {
    display: none;
  }
`;

export const VideoContainer = styled.div`
  .bloco {
    height: 120px;
    width: 180px;
  }

  .blocos {
    width: 1200px;
    display: flex;
    position: absolute;
    top: 0;
    justify-content: space-between;
  }

  .vermelho {
    background-color: #f00;
  }

  .verde {
    background-color: #0f0;
  }

  .amarelo {
    background-color: yellow;
  }

  .azul {
    background-color: #00f;
  }
`

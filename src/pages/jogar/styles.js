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
  position: relative;

  .bloco {
    height: 100px;
    width: 100px;
    position: absolute;
  }

  .vermelho {
    top: 0;
    left: 0;
    background-color: #f00;
  }

  .verde {
    top: 0;
    right: 0;
    background-color: #0f0;
  }

  .amarelo {
    bottom: 0;
    left: 0;
    background-color: yellow;
  }

  .azul {
    bottom: 0;
    right: 0;
    background-color: #00f;
  }
`

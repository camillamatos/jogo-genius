import React from 'react';
import { Link } from 'react-router-dom';
import * as S from './styles';

function Fim(props) {
  const winner =  props.location.state;

  return(
    <S.Container>
      <h1>Genius Game</h1>  
      {winner ? <p>Parabéns! Você tem uma ótima memória e venceu o jogo</p> : <p>Que pena! Não foi dessa vez que você conseguiu ganhar o jogo</p>}
      <Link to='seq/1'><S.Button>{winner ? 'JOGAR NOVAMENTE' : 'TENTAR NOVAMENTE'}</S.Button></Link>
    </S.Container>
  )
}

export { Fim };
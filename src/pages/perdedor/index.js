import React  from 'react';
import * as S from './styles';
import { Link } from 'react-router-dom'

function Perdedor() {
  return(
    <S.Container>
      <h1>Genius Game</h1>  
      <p>voce perdeu</p>
      <Link to='seq/1'><S.Button>TENTAR NOVAMENTE</S.Button></Link>
    </S.Container>
  )
}

export { Perdedor };
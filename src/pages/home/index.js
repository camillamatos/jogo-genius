import React  from 'react';
import * as S from './styles';
import { Link } from 'react-router-dom'

function Home() {
  return(
    <S.Container>
      <h1>Genius Game</h1>  
      <p>Bem vindo ao Genius Game!!</p>
      <p>A seguir serão mostradas algumas cores, que você deverá lembrar a ordem em que aparecem e apontar para elas com a sua mão.</p>
      <p>Vamos começar?</p>
      <Link to='seq1'><S.Button>COMEÇAR</S.Button></Link>
    </S.Container>
  )
}

export { Home };
import React  from 'react';
import * as S from './styles';
import { Link } from 'react-router-dom'

function Home() {
  return(
    <S.Container>
      <h1>Genius Game</h1>  
      <p>Bem vindo ao jogo mais divertido de memória!!</p>
      <p>Pra jogar é muito simples:</p>
      <p>1 - clique em começar <br />2 - preste muita atenção nas cores <br />3 - passe a sua mão em cima da cor certa na ordem que você viu <br />4 - complete todas as fases até vencer!!</p>
      <img src="pintura.png" alt="" />
      <Link to='seq/1'><S.Button>COMEÇAR</S.Button></Link>
    </S.Container>
  )
}

export { Home };
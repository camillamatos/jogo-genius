import React, {useState}  from 'react';
import { useHistory } from 'react-router-dom';
import * as S from './styles';
import { colors2 } from '../sequencias';

function Sequencia2() {
  const history = useHistory();
  const [index, setIndex] = useState(0)

  setInterval(function() {
    setIndex(index+1)
  }, 1500);

  if(index === 5){
    clearInterval();
    history.push('/')
  }

  return(
    <S.Container>
      <h1>Preste atenção nas cores!</h1>  
      <S.Color color={colors2[index]} />
    </S.Container>
  )
}

export { Sequencia2 };
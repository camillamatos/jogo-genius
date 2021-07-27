import React, {useState}  from 'react';
import { useHistory } from 'react-router-dom';
import * as S from './styles';
import { colors1 } from '../sequencias';

function Sequencia1() {
  const history = useHistory();
  const [index, setIndex] = useState(0)

  setInterval(function() {
    setIndex(index+1)
  }, 1500);

  if(index === 4){
    clearInterval();
    history.push('/')
  }

  return(
    <S.Container>
      <h1>Preste atenção nas cores!</h1>  
      <S.Color color={colors1[index]} />
    </S.Container>
  )
}

export { Sequencia1 };
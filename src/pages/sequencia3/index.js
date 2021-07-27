import React, {useState}  from 'react';
import { useHistory } from 'react-router-dom';
import * as S from './styles';
import { colors3 } from '../sequencias';

function Sequencia3() {
  const history = useHistory();
  const [index, setIndex] = useState(0)

  setInterval(function() {
    setIndex(index+1)
  }, 1500);

  if(index === 6){
    clearInterval();
    history.push('/')
  }

  return(
    <S.Container>
      <h1>Preste atenção nas cores!</h1>  
      <S.Color color={colors3[index]} />
    </S.Container>
  )
}

export { Sequencia3 };
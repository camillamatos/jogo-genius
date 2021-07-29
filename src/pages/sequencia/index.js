import React, {useEffect, useState}  from 'react';
import { useHistory, useParams } from 'react-router-dom';
import * as S from './styles';
import { fase1, fase2, fase3 } from '../sequencias';

function Sequencia() {
  const { fase } = useParams();
  const history = useHistory();
  const [index, setIndex] = useState(0);
  const [colors, setColors] = useState();

  useEffect(() => {
    switch (fase) {
      case '1':
        setColors(fase1)
        break;
      case '2':
        setColors(fase2)
        break;
      case '3':
        setColors(fase3)
        break;
      default:
        break;
    }
  }, [fase]);

  setInterval(function() {
    setIndex(index+1)
  }, 1500);

  if(index === colors?.length){
    clearInterval();
    history.push(`/jogar/${fase}`)
  }

  return(
    <S.Container>
      <h1>Preste atenção nas cores!</h1>  
      {colors && <S.Color color={colors[index]} />}
    </S.Container>
  )
}

export { Sequencia };
import React, { useEffect, useState, useCallback }  from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSounds } from '../../hooks/sounds'
import { getSequence } from '../../utils/colors';
import { sleep } from '../../utils/sleep'
import * as S from './styles';

function Sequencia() {
  const { fase } = useParams();
  const history = useHistory();
  const [index, setIndex] = useState(0);
  const [colors, setColors] = useState([]);
  const [ready, setReady] = useState(false);
  const seq = getSequence(Number(fase) + 3);
  const {
    emitSound
  } = useSounds();

  const setFase = useCallback(fase => {
    const index = Number(fase) - 1;
    if (isNaN(index)) {
      history.push('/');
      return;
    }
    setColors(seq);
  }, [history, seq]);

  useEffect(() => {
    if (ready) {
      const currentColor = colors[index];
      emitSound(currentColor);
    }
  }, [index, emitSound, ready, colors]);

  useEffect(() => {
    let interval = null;
    
    const start = async () => {
      if (!ready) {
        await sleep(2);
        setReady(true);
        setFase(fase);
        return;
      }

      interval = setInterval(async () => {
        const newIndex = index + 1;
        if (newIndex > 0 && newIndex === colors.length) {
          history.push(`/jogar/${fase}`, { sequence: colors });
          return;
        }
        setIndex(newIndex);
      }, 750);
    };

    start();

    return () => {
      clearInterval(interval);
    }

  }, [fase, setFase, index, colors.length, history, colors, ready, emitSound]);

  return(
    <S.Container>
      <h1>Preste atenção nas cores!</h1> 
        <div className='blocks'>
          <S.Color color="#f00" atual={colors[index]} />
          <S.Color color="#0f0" atual={colors[index]} />
          <S.Color color="#00f" atual={colors[index]} />
          <S.Color color="#ff0" atual={colors[index]} />
        </div>
    </S.Container>
  )
}

export { Sequencia };
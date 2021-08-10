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
  const { emitSound } = useSounds();

  const setFase = useCallback(seq => {
    const index = Number(fase) - 1;
    if (isNaN(index)) {
      history.push('/');
      return;
    }
    setColors(seq);
  }, [history, fase]);

  useEffect(() => {
    if (ready) {
      const currentColor = colors[index];
      emitSound(currentColor);
    }
  }, [index, emitSound, ready, colors]);

  useEffect(() => {
    const start = async () => {
      await sleep(1);
      const newSequence = getSequence(Number(fase) + 3);

      setReady(true);
      setFase(newSequence);

      for (let i = 0; i < newSequence.length; i++) {
        setIndex(i);
        await sleep(1);
      }
      history.push(`/jogar/${fase}`, { sequence: newSequence });
    };
    start();
  }, [setFase, fase, history]);

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

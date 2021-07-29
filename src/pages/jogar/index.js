import React, { useRef, useEffect, useCallback, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { fase1, fase2, fase3 } from '../sequencias';
import * as S from './styles';

function Jogar() {
  const videoRef = useRef(null);
  const videoFlipRef = useRef(null);
  const mapaMovimentoRef = useRef(null);
  const { fase } = useParams();
  const [colors, setColors] = useState();
  const selectedColors = []
  const [index, setIndex] = useState(0);
  const history = useHistory();

  function verifySequence(){
    if(fase === '3') return history.push('/voce-venceu')

    return history.push(`/seq/${Number(fase) + 1}`)
  }

  function checkColor(){
    if(colors[index] !== selectedColors[index]) return history.push('/voce-perdeu')

    setIndex(index+1)
    if(selectedColors.length ===  colors.length) return verifySequence()
  }

  const getVideo = useCallback(async () => {
    try {
      const stream = await navigator
        .mediaDevices
        .getUserMedia({ video: true });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => videoRef.current.play();
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const setMapaMovimento = useCallback(async () => {
    if (videoFlipRef.current && mapaMovimentoRef.current && videoRef.current) {
      const contextoVideoFlip = videoFlipRef.current.getContext('2d');
      const contextoMapaMovimento = mapaMovimentoRef.current.getContext('2d');

      contextoVideoFlip.translate(videoFlipRef.current.width, 0);
      contextoVideoFlip.scale(-1, 1);

      setInterval(() => {
        contextoVideoFlip.drawImage(videoRef.current, 0, 0, videoRef.current.width, videoRef.current.height);
        const image = contextoVideoFlip.getImageData(0, 0, videoFlipRef.current.width, videoFlipRef.current.height);
        contextoVideoFlip.drawImage(videoRef.current, 0, 0, videoRef.current.width, videoRef.current.height);
        const frame = contextoVideoFlip.getImageData(0, 0, videoFlipRef.current.width, videoFlipRef.current.height)

        for (let i = 0; i < frame.data.length; i += 4) {
          let media = Math.abs((frame.data[i] + frame.data[i + 1] + frame.data[i + 2]) - (image.data[i] + image.data[i + 1] + image.data[i + 2])) / 3;
          media = media > 15 ? 255 : 0;
          frame.data[i] = media;
          frame.data[i + 1] = media;
          frame.data[i + 2] = media;
          frame.data[i + 3] = 255;
        }
        contextoMapaMovimento.putImageData(frame, 0, 0);
    }, 1000 / 60)
    }
  }, [])

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

    getVideo();
    setMapaMovimento();
  }, [getVideo, setMapaMovimento]);

  return (
    <S.Container>
      <S.VideoContainer>
        <video ref={videoRef} autoPlay width="640" height="480" />
        <canvas ref={videoFlipRef} width="640" height="480" />
        <canvas id="mapa-movimento" ref={mapaMovimentoRef} width="640" height="480" />
        <div className="bloco vermelho" />
        <div className="bloco verde" />
        <div className="bloco azul" />
        <div className="bloco amarelo" />
      </S.VideoContainer>
    </S.Container>
  )
}

export { Jogar }

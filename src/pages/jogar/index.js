import React, { useRef, useEffect, useCallback, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { useSounds } from '../../hooks/sounds'
import * as S from './styles';

function Jogar() {
  const colors = useLocation().state.sequence;
  const [index, setIndex] = useState(0);
  const [ready, setReady] = useState(false);
  const { fase } = useParams();
  const history = useHistory();
  const videoRef = useRef(null);
  const videoFlipRef = useRef(null);
  const mapaMovimentoRef = useRef(null);
  const q1 = useRef(null);
  const q2 = useRef(null);
  const q3 = useRef(null);
  const q4 = useRef(null);
  let time = useRef(null);
  const { emitSound } = useSounds();

  const verifySequence = useCallback(() => {
    if(fase === '3') return history.push('/fim', true)
    
    return history.push(`/seq/${Number(fase) + 1}`, { sequence: colors })
  }, [fase, history, colors]);

  const checkColor = useCallback((color) => {
    if(colors[index] !== color){
      emitSound('erro');
      return history.push('/fim', false);
    } 

    emitSound(color);
    const newIndex = index + 1;
    setIndex(newIndex);

    if(newIndex >= colors.length) return verifySequence()
  }, [colors, verifySequence, index, emitSound]);

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

  const debounce = useCallback(color => {
    clearTimeout(time.current);
    time.current = setTimeout(() => {
      checkColor(color);
    }, 500);
  }, [time, checkColor]);

  useEffect(() => {
    getVideo();

    let interval = null;

    if (videoFlipRef.current && mapaMovimentoRef.current && videoRef.current && q1.current && q2.current && q3.current && q4.current) {
      const contextoVideoFlip = videoFlipRef.current.getContext('2d');
      const contextoMapaMovimento = mapaMovimentoRef.current.getContext('2d');

      if (!ready) {
        contextoVideoFlip.translate(videoFlipRef.current.width, 0);
        contextoVideoFlip.scale(-1, 1);
        setReady(true);
      }

      interval = setInterval(() => {
        if (!videoRef.current || !ready) return;
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

        const offset1 = [q1.current.offsetLeft, q1.current.offsetTop, q1.current.offsetWidth, q1.current.offsetHeight];
        const offset2 = [q2.current.offsetLeft, q2.current.offsetTop, q2.current.offsetWidth, q2.current.offsetHeight];
        const offset3 = [q3.current.offsetLeft, q3.current.offsetTop, q3.current.offsetWidth, q3.current.offsetHeight];
        const offset4 = [q4.current.offsetLeft, q4.current.offsetTop, q4.current.offsetWidth, q4.current.offsetHeight];

        const dadosImgMapa1 = contextoMapaMovimento.getImageData(offset1[0], offset1[1], offset1[2], offset1[3]);
        const dadosImgMapa2 = contextoMapaMovimento.getImageData(offset2[0], offset2[1], offset2[2], offset2[3]);
        const dadosImgMapa3 = contextoMapaMovimento.getImageData(offset3[0], offset3[1], offset3[2], offset3[3]);
        const dadosImgMapa4 = contextoMapaMovimento.getImageData(offset4[0], offset4[1], offset4[2], offset4[3]);

        const qntPixels = [(dadosImgMapa1.data.length / 4), (dadosImgMapa2.data.length / 4), (dadosImgMapa3.data.length / 4), (dadosImgMapa4.data.length / 4)];

        let i = [0, 0, 0, 0];
        let soma = [0, 0, 0, 0];

        while (i[0] < qntPixels[0]) {
          soma[0] += dadosImgMapa1.data[i[0]*4];
          ++i[0];
        }

        while (i[1] < qntPixels[1]) {
          soma[1] += dadosImgMapa2.data[i[1]*4];
          ++i[1];
        }

        while (i[2] < qntPixels[2]) {
          soma[2] += dadosImgMapa3.data[i[2]*4];
          ++i[2];
        }

        while (i[3] < qntPixels[3]) {
          soma[3] += dadosImgMapa4.data[i[3]*4];
          ++i[3];
        }

        if (Math.round(soma[0] / qntPixels[0]) > 10) {
          debounce('#f00');
        }

        if (Math.round(soma[1] / qntPixels[1]) > 10) {
          debounce('#0f0');
        }

        if (Math.round(soma[2] / qntPixels[2]) > 10) {
          debounce('#00f');
        }

        if (Math.round(soma[3] / qntPixels[3]) > 10) {
          debounce('#ff0');
        }
      }, 1000 / 60)
    }

    return () => clearInterval(interval);
  }, [getVideo, debounce, ready]);

  return (
    <S.Container>
      <S.VideoContainer>
        <video ref={videoRef} autoPlay width="1200" height="800" />
        <canvas ref={videoFlipRef} width="1200" height="800"  />
        <canvas id="mapa-movimento" ref={mapaMovimentoRef} width="1200" height="800"  />
        <div className="blocos">
          <div ref={q1} className="bloco vermelho" />
          <div ref={q2} className="bloco verde" />
          <div ref={q3} className="bloco azul" />
          <div ref={q4} className="bloco amarelo" />
       </div>
      </S.VideoContainer>
    </S.Container>
  )
}

export { Jogar }

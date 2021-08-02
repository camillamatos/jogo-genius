import React, { useRef, useEffect, useCallback, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { fase1, fase2, fase3 } from '../sequencias';
import * as S from './styles';

function Jogar() {
  // sequencia certa do jogo
  const [colors, setColors] = useState([]);
  const [index, setIndex] = useState(0);
  const [selectedColors, setSelectedColors] = useState([]);
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

  const setCorrectColor = useCallback(() => {
    switch (fase) {
      case 1:
        setColors(fase1)
        break;
      case 2:
        setColors(fase2)
        break;
      case 3:
        setColors(fase3)
        break;
      default:
        break;
    }
  }, [fase])

  const verifySequence = useCallback(() => {
    if(fase === '3') return history.push('/voce-venceu')
    return history.push(`/seq/${Number(fase) + 1}`)
  }, [fase, history]);

  const checkColor = useCallback(() => {
    if(colors[index] !== selectedColors[index]) return history.push('/voce-perdeu')
    setIndex(index => index + 1)
    // if(selectedColors.length ===  colors.length) return verifySequence()
  }, [colors, history, index, selectedColors])

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

  const debounce = color => {
    clearTimeout(time);
    time = setTimeout(() => {
      setSelectedColors(selected => [...selected, color]);
    }, 500);
  }

  const setMapaMovimento = useCallback(async () => {
    if (videoFlipRef.current && mapaMovimentoRef.current && videoRef.current && q1.current && q2.current && q3.current && q4.current) {
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

        const x1 = q1.current.offsetLeft, y1 = q1.current.offsetTop, w1 = q1.current.offsetWidth, h1 = q1.current.offsetHeight;
        // const x2 = q2.current.offsetLeft, y2 = q2.current.offsetTop, w2 = q2.current.offsetWidth, h2 = q2.current.offsetHeight;
        // const x3 = q3.current.offsetLeft, y3 = q3.current.offsetTop, w3 = q3.current.offsetWidth, h3 = q3.current.offsetHeight;
        // const x4 = q4.current.offsetLeft, y4 = q4.current.offsetTop, w4 = q4.current.offsetWidth, h4 = q4.current.offsetHeight;

        const dadosImgMapa1 = contextoMapaMovimento.getImageData(x1,y1,w1,h1);
        // const dadosImgMapa2 = contextoMapaMovimento.getImageData(x2,y2,w2,h2);
        // const dadosImgMapa3 = contextoMapaMovimento.getImageData(x3,y3,w3,h3);
        // const dadosImgMapa4 = contextoMapaMovimento.getImageData(x4,y4,w4,h4);

        const quantidadeDePixels1 = (dadosImgMapa1.data.length / 4);
        // const quantidadeDePixels2 = (dadosImgMapa2.data.length / 4);
        // const quantidadeDePixels3 = (dadosImgMapa3.data.length / 4);
        // const quantidadeDePixels4 = (dadosImgMapa4.data.length / 4);

        let i1 = 0, i2 = 0, i3 = 0, i4 = 0;
        let soma1 = 0, soma2 = 0, soma3 = 0, soma4 = 0;

        while (i1 < quantidadeDePixels1) {
          soma1 += dadosImgMapa1.data[i1*4];
          ++i1;
        }

        if (Math.round(soma1 / quantidadeDePixels1) > 10) {
          // setSelectedColors(selected => [...selected, '#f00']);
          debounce('#f00');
        }

        // while (i2 < quantidadeDePixels2) {
        //   soma2 += dadosImgMapa2.data[i2*4];
        //   ++i2;
        // }

        // if (Math.round(soma2 / quantidadeDePixels2) > 10) {
        //   setSelectedColors(selected => [...selected, '#0f0']);
        // }

        // while (i3 < quantidadeDePixels3) {
        //   soma3 += dadosImgMapa3.data[i3*4];
        //   ++i3;
        // }

        // if (Math.round(soma3 / quantidadeDePixels3) > 10) {
        //   setSelectedColors(selected => [...selected, '#ff0'])
        // }

        // while (i4 < quantidadeDePixels4) {
        //   soma4 += dadosImgMapa4.data[i4*4];
        //   ++i4;
        // }

        // if (Math.round(soma4 / quantidadeDePixels4) > 10) {
        //   setSelectedColors(selected => [...selected, '#00f'])
        // }

        // checkColor();
      }, 1000 / 60)
    }
  }, [])

  useEffect(() => {
    setCorrectColor();
    getVideo();
    setMapaMovimento();
  }, [getVideo, setMapaMovimento, setCorrectColor]);

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

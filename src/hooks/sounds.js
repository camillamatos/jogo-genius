import { useCallback } from 'react';
import useSound from 'use-sound';
import somamarelo from '../utils/sons/amarelo.mp3';
import somazul from '../utils/sons/azul.mp3';
import somverde from '../utils/sons/verde.mp3';
import somvermelho from '../utils/sons/vermelho.mp3';

export const useSounds = () => {
  const [amarelo] = useSound(somamarelo);
  const [azul] = useSound(somazul);
  const [verde] = useSound(somverde);
  const [vermelho] = useSound(somvermelho);

  const emitSound = useCallback(color => {
    switch (color) {
      case '#f00':
        vermelho();
        return;
      case '#ff0':
        amarelo();
        return;
      case '#0f0':
        verde();
        return;
      case '#00f':
        azul();
        return;
      default:
        return;
    }
  }, [vermelho, amarelo, verde, azul]);

  return { emitSound };
};
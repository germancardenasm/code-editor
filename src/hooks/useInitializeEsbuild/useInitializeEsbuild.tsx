import { useEffect, useState } from 'react';
import esbuild from 'esbuild-wasm';

export const useInitializeEsbuild = () => {
  const [isEsbuildInitialized, setIsEsbuildInitialized] = useState(false);

  useEffect(() => {
    if (isEsbuildInitialized) return;
    const initializeBundler = async () => {
      try {
        await esbuild.initialize({
          wasmURL: '/esbuild.wasm',
          worker: true
        });
        setIsEsbuildInitialized(true);
      } catch (e) {
        console.log({ e });
      }
    };
    initializeBundler();
  }, [isEsbuildInitialized]);

  return isEsbuildInitialized;
};

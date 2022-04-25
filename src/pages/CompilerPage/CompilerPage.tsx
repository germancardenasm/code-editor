import React, { useEffect, useRef, useState } from 'react';
import * as esbuild from 'esbuild-wasm';
import styles from './CompilerPage.module.scss';
import { resolvePackagePath, fetchPackage } from '../../plugins';

const CompilerPage = () => {
  const [userCode, setUserCode] = useState(
    'import toUpper from "nested-test-pkg"; const App = ()=><div>hello</div>; console.log(App);'
  );
  const [transpiledCode, setTranspiledCode] = useState<string | undefined>('');
  const [isEsbuildInitialized, setIsEsbuildInitialized] = useState(false);
  const isCompileButtonDisable = isEsbuildInitialized === false;

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

  const handleOnClick = async () => {
    try {
      const compiledCode = await esbuild.build({
        bundle: true,
        plugins: [resolvePackagePath(), fetchPackage(userCode)],
        entryPoints: ['index.js'],
        define: { 'process.env.NODE_ENV': '"production"', global: 'window' }
      });
      setTranspiledCode(
        compiledCode.outputFiles ? compiledCode.outputFiles[0].text : ''
      );
    } catch (error) {
      console.log('error: ', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserCode(e.target.value);
  };

  return (
    <div>
      <button
        onClick={handleOnClick}
        className={styles['compile-button']}
        disabled={isCompileButtonDisable}
      >
        compile
      </button>
      <div>
        <textarea
          className={styles['code']}
          onChange={handleInputChange}
          value={userCode}
        ></textarea>
        <code className={styles['output']}>{transpiledCode}</code>
      </div>
    </div>
  );
};

export default CompilerPage;

import React, { useRef, useState } from 'react';
import esbuild from 'esbuild-wasm';
import styles from './CompilerPage.module.scss';
import { resolvePackagePath, fetchPackage } from '../../plugins';
import { iframeInitHtml, initialCode } from './constants';
import { useInitializeEsbuild } from '../../hooks';

const CompilerPage = () => {
  const [userCode, setUserCode] = useState(initialCode);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const isEsbuildInitialized = useInitializeEsbuild();
  const isCompileButtonDisable = isEsbuildInitialized === false;

  const handleOnClick = async () => {
    try {
      const compiledCode = await esbuild.build({
        bundle: true,
        plugins: [resolvePackagePath(), fetchPackage(userCode)],
        entryPoints: ['index.js'],
        define: { 'process.env.NODE_ENV': '"development"', global: 'window' }
      });
      const compiledUserCode = compiledCode?.outputFiles?.[0]?.text;
      iframeRef.current &&
        iframeRef.current.contentWindow &&
        iframeRef.current.contentWindow.postMessage(compiledUserCode, '*');
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
        <iframe
          className={styles['output']}
          title='preview'
          srcDoc={iframeInitHtml}
          sandbox='allow-scripts'
          ref={iframeRef}
        ></iframe>
      </div>
    </div>
  );
};

export default CompilerPage;

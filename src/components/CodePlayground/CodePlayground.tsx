import React, { useState, useEffect } from 'react';
import { initialCode } from './constants';
import { useInitializeEsbuild } from '../../hooks';
import { CodeEditor } from './CodeEditor';
import { Preview } from './Preview';
import { buildCode } from '../../utils';
import debounce from 'lodash/debounce';
import Resizable from '../Resizable';
import styles from './CodePlayground.module.scss';

const CodePlayground = () => {
  const [userCode, setUserCode] = useState(initialCode);
  const [compiledUserCode, setCompiledUserCode] = useState<
    string | undefined
  >();

  useInitializeEsbuild();

  useEffect(() => {
    const compileAndBuild = async () => {
      try {
        const buildResults = await buildCode(userCode);
        const compiledCode = buildResults?.outputFiles?.[0]?.text;
        setCompiledUserCode(compiledCode);
      } catch (error) {
        console.log('error: ', error);
      }
    };
    const debounceFunction = debounce(compileAndBuild, 500, {
      leading: false,
      trailing: true
    });
    debounceFunction();
    return () => debounceFunction.cancel();
  }, [userCode]);

  const handleInputChange = (value: string) => {
    setUserCode(value);
  };

  return (
    <div className={styles['code-playground-wrapper']}>
      <Resizable direction='vertical'>
        <div className='d-flex h-100'>
          <CodeEditor onChange={handleInputChange} />
          <Preview compiledUserCode={compiledUserCode} />
        </div>
      </Resizable>
    </div>
  );
};
export default CodePlayground;

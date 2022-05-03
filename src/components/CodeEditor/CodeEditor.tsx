import MonacoEditor from '@monaco-editor/react';
import * as monaco from 'monaco-editor';
import { FC, useRef } from 'react';
import prettier from 'prettier';
import prettierOptions from './prettierOptions';
import styles from './CodeEditor.module.scss';
import { initialCode } from './constants';

interface ICodeEditor {
  onChange(value?: string): void;
}

const CodeEditor: FC<ICodeEditor> = ({ onChange }) => {
  const monacoRef = useRef<monaco.editor.IStandaloneCodeEditor>();

  const handleOnMount = (editor: monaco.editor.IStandaloneCodeEditor) => {
    monacoRef.current = editor;
  };

  const handleInputChange = (value?: string): void => {
    onChange(value);
  };

  const handleOnFormat = (): void => {
    const unformattedCode = monacoRef.current
      ? monacoRef.current?.getValue()
      : '';

    const formattedCode = prettier.format(unformattedCode, prettierOptions);
    console.log({formattedCode});
    monacoRef.current?.setValue(formattedCode);
  };

  return (
    <div className={styles['editor-wrapper']}>
      <button onClick={handleOnFormat}>Format</button>
      <MonacoEditor
        language='typescript'
        theme='vs-dark'
        value={initialCode}
        options={{
          selectOnLineNumbers: true,
          fontSize: 14,
          minimap: {
            enabled: false
          }
        }}
        onChange={handleInputChange}
        onMount={handleOnMount}
        height={500}
      />
    </div>
  );
};

export default CodeEditor;

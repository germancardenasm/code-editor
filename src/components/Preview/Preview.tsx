import { useEffect, useRef, FC } from 'react';
import { iframeInitHtml } from './constants';
import styles from './Preview.module.scss';

interface PreviewProps {
  compiledUserCode: string | undefined;
}

const Preview: FC<PreviewProps> = ({ compiledUserCode }) => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  console.log({compiledUserCode});
  useEffect(() => {
    iframeRef.current &&
      iframeRef.current.contentWindow &&
      iframeRef.current.contentWindow.postMessage(compiledUserCode, '*');
  }, [compiledUserCode]);

  return (
    <iframe
      className={styles['output']}
      title='preview'
      srcDoc={iframeInitHtml}
      sandbox='allow-scripts'
      ref={iframeRef}
    ></iframe>
  );
};

export default Preview;

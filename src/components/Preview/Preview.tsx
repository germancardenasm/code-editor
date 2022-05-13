import { useEffect, useRef, FC } from 'react';
import { iframeInitHtml } from './constants';
import styles from './Preview.module.scss';

interface PreviewProps {
  compiledUserCode: string | undefined;
}

const Preview: FC<PreviewProps> = ({ compiledUserCode }) => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  console.log({ compiledUserCode });
  useEffect(() => {
    iframeRef.current &&
      iframeRef.current.contentWindow &&
      iframeRef.current.contentWindow.postMessage(compiledUserCode, '*');
  }, [compiledUserCode]);

  return (
    <div className='position-relative'>
      <div className={styles['overlay-element']}></div>
      <iframe
        className='flex-grow-1'
        title='preview'
        srcDoc={iframeInitHtml}
        sandbox='allow-scripts'
        ref={iframeRef}
      ></iframe>
    </div>
  );
};

export default Preview;

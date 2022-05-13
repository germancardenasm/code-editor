import React, { useState } from 'react';
import { ResizableBox, ResizeCallbackData } from 'react-resizable';
import './Resizable.scss';

interface TResizeCallback {
  (e: React.SyntheticEvent, data: ResizeCallbackData): void;
}

interface IResizableProps {
  initialHeight?: number;
  initialWidth?: number;
}

const Resizable: React.FC<IResizableProps> = ({
  children,
  initialHeight = 500,
  initialWidth = Infinity
}) => {
  const [height, setHeight] = useState(initialHeight);

  const onResize: TResizeCallback = (_event, { size }) => {
    setHeight(size.height);
  };

  return (
    <ResizableBox
      height={height}
      width={initialWidth}
      onResizeStop={onResize}
      axis='y'
      resizeHandles={['s']}
    >
      {children}
    </ResizableBox>
  );
};
export default Resizable;

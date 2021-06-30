import React from 'react';
import { FC } from 'react';

type Props = {
  text: string;
  fontSize: number;
  width: number;
  height: number;
  fullHeight: number;
  offset: number;
  fullOffset: number;
};

const FittedTextInner: FC<Props> = ({
  text,
  fontSize,
  width,
  height,
  fullHeight,
  offset,
  fullOffset,
}: Props) => {
  return (
    <div style={{ position: 'relative', width, height }}>
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: fullHeight,
          bottom: `${-fullOffset + offset}px`,
        }}
      >
        <div
          style={{
            position: 'absolute',
            height: 100 * height,
            bottom: `${fullOffset}px`,
          }}
        >
          <div
            style={{
              display: 'inline-block',
              height: '100%',
              width: '0',
              content: '',
            }}
          ></div>
          <span
            style={{
              fontSize: `${fontSize}px`,
              verticalAlign: 'baseline',
            }}
          >
            {text}
          </span>
        </div>
      </div>
    </div>
  );
};

export default FittedTextInner;

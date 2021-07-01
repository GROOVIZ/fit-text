import React, { useEffect } from 'react';
import { FC } from 'react';
import useFitText from '../hooks/useFitText';
import { FontMetricsOptions } from '@grooviz/font-metrics';
import { FitResult } from '../types/FitResult';
import { TextAlign } from '../types/TextAlign';
import { TextDirection } from '../types/TextDirection';
import FittedTextInner from './FittedTextInner';

type Props = {
  text: string;
  topMetric: string;
  bottomMetric: string;
  align: TextAlign;
  verticalAlign: TextAlign;
  direction: TextDirection;
  maxWidth: number;
  maxHeight: number;
  fontFamily: string;
  fontStyle: string;
  fontWeight: string;
  options: FontMetricsOptions;
  onFit?: (result: FitResult) => void;
};

const flexAlign = (align: 'start' | 'middle' | 'end') => {
  switch (align) {
    case 'start':
      return 'flex-start';
    case 'middle':
      return 'center';
    case 'end':
      return 'flex-end';
  }
};

type TransformData = {
  transform: string;
  origin: string;
};

const getTransformData: {
  [key: string]: (width: number, height: number) => TransformData;
} = {
  right: (_w, _h) => ({
    transform: `rotate(0deg)`,
    origin: 'center',
  }),
  bottom: (_w, h) => ({
    transform: `rotate(90deg)`,
    origin: `${h / 2}px center`,
  }),
  left: (_w, _h) => ({
    transform: `rotate(180deg)`,
    origin: 'center',
  }),
  top: (w, h) => ({
    transform: `translateY(${w - h}px) rotate(-90deg)`,
    origin: `${h / 2}px center`,
  }),
};

const FittedTextWrapper: FC<Props> = ({
  text,
  topMetric,
  bottomMetric,
  align,
  verticalAlign,
  direction,
  maxWidth,
  maxHeight,
  fontFamily,
  fontStyle,
  fontWeight,
  options,
  onFit,
}) => {
  const isVertical = [TextDirection.top, TextDirection.bottom].includes(
    direction
  );
  console.count(`useFitText ${text}`);
  const {
    fontSize,
    width,
    height,
    fullHeight,
    offset,
    fullOffset,
  } = useFitText({
    text,
    maxWidth: isVertical ? maxHeight : maxWidth,
    maxHeight: isVertical ? maxWidth : maxHeight,
    fontFamily,
    fontStyle,
    fontWeight,
    topMetric,
    bottomMetric,
    options,
  });
  useEffect(() => {
    onFit && onFit({ fontSize, width, height, fullHeight, offset, fullOffset });
  }, [fontSize, width, height, fullHeight, offset, fullOffset]);
  const transformData = getTransformData[direction](width, height);
  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        justifyContent: flexAlign(align),
        alignItems: flexAlign(verticalAlign),
      }}
    >
      <div
        style={{
          width: isVertical ? height : width,
          height: isVertical ? width : height,
        }}
      >
        <div
          style={{
            transformOrigin: transformData.origin,
            transform: transformData.transform,
          }}
        >
          <div
            style={{
              transformOrigin: 'top left',
              transform: `scale(${fontSize / Math.ceil(fontSize)})`,
            }}
          >
            <FittedTextInner
              {...{
                text,
                fontSize: Math.ceil(fontSize),
                width: (width * Math.ceil(fontSize)) / fontSize,
                height: (height * Math.ceil(fontSize)) / fontSize,
                fullHeight,
                offset,
                fullOffset,
                // fontFamily,
                // fontStyle,
                // fontWeight
              }}
            />
          </div>{' '}
        </div>
      </div>
    </div>
  );
};

export default FittedTextWrapper;

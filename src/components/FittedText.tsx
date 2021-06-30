import React, { FC, useEffect, useRef, useState } from 'react';
import { FontMetricsOptions } from '@grooviz/font-metrics';
import { FitResult } from '../types/FitResult';
import { TextAlign } from '../types/TextAlign';
import { TextDirection } from '../types/TextDirection';
import FittedTextWrapper from './FittedTextWrapper';
import { useResizeDetector } from 'react-resize-detector';

type Props = {
  text: string;
  width?: number;
  height?: number;
  topMetric?: string;
  bottomMetric?: string;
  align?: TextAlign;
  verticalAlign?: TextAlign;
  direction?: TextDirection;
  options?: FontMetricsOptions;
  onFit?: (result: FitResult) => void;
};

const FittedText: FC<Props> = ({
  text = 'text',
  width = 0,
  height = 0,
  topMetric = 'top',
  bottomMetric = 'bottom',
  align = TextAlign.start,
  verticalAlign = TextAlign.end,
  direction = TextDirection.right,
  options = {},
  onFit = (_r: FitResult) => {},
}) => {
  const [fontFamily, setFontFamily] = useState('');
  const [fontStyle, setFontStyle] = useState('');
  const [fontWeight, setFontWeight] = useState('');

  const targetRef = useRef<HTMLDivElement>(null);
  const { width: maxWidth, height: maxHeight } = useResizeDetector({
    targetRef,
  });

  useEffect(() => {
    const divStyles = window.getComputedStyle(targetRef.current!);
    setFontFamily(divStyles.getPropertyValue('font-family'));
    setFontStyle(divStyles.getPropertyValue('font-style'));
    setFontWeight(divStyles.getPropertyValue('font-weight'));
    console.log(
      divStyles.getPropertyValue('font-family'),
      divStyles.getPropertyValue('font-style'),
      divStyles.getPropertyValue('font-weight')
    );
  }, [targetRef.current]);

  console.log('YOP');

  return (
    <section
      ref={targetRef}
      style={{
        width: !!width ? width : '100%',
        height: !!height ? height : '100%',
      }}
    >
      {!!maxWidth && !!maxHeight && (
        <FittedTextWrapper
          {...{
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
          }}
        />
      )}
    </section>
  );
};

export default FittedText;

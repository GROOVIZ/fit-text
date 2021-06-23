import React, { FC, useEffect, useRef, useState } from 'react';
import { FontMetricsOptions } from '@grooviz/font-metrics';
import { FitResult } from '../types/FitResult';
import { TextAlign } from '../types/TextAlign';
import { TextDirection } from '../types/TextDirection';
import FittedTextWrapper from './FittedTextWrapper';

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
  // if (typeof window === "undefined") {
  //   return <div>{text}</div>;
  // }

  // const [sizedByParent, setSizedByParent] = useState(false)
  // const [onlyWidth, setOnlyWidth] = useState(false)
  // const [onlyHeight, setOnlyHeight] = useState(false)
  const [maxWidth, setMaxWidth] = useState(0);
  const [maxHeight, setMaxHeight] = useState(0);
  const [fontFamily, setFontFamily] = useState('');
  const [fontStyle, setFontStyle] = useState('');
  const [fontWeight, setFontWeight] = useState('');

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    // setSizedByParent(!width && !height)
    // setOnlyWidth(!!width && !height)
    // setOnlyHeight(!width && !!height)
    setMaxWidth(ref.current.offsetWidth);
    setMaxHeight(ref.current.offsetHeight);
    const divStyles = window.getComputedStyle(ref.current!);
    setFontFamily(divStyles.getPropertyValue('font-family'));
    setFontStyle(divStyles.getPropertyValue('font-style'));
    setFontWeight(divStyles.getPropertyValue('font-weight'));
  }, [width, height, ref.current?.offsetWidth, ref.current?.offsetHeight]);

  // console.log(
  //   text,
  //   maxWidth,
  //   maxHeight,
  //   fontFamily,
  //   fontStyle,
  //   fontWeight,
  //   topMetric,
  //   bottomMetric,
  //   align,
  //   verticalAlign,
  //   direction
  //   // fitResult,
  //   // setFitResult
  // )

  console.log('W/H: ', width, height);

  return (
    <section
      ref={ref}
      style={{
        width: !!width ? width : '100%',
        height: !!height ? height : '100%',
      }}
    >
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
    </section>
  );
};

export default FittedText;

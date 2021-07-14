import { initialFitResult } from '../types/FitResult';
import {
  useFontMetrics,
  FontMetricsOptions,
  FontOffsets,
} from '@grooviz/font-metrics';

type Props = {
  text: string;
  fontFamily: string;
  fontStyle?: string;
  fontWeight?: string;
  maxWidth: number;
  maxHeight: number;
  topMetric?: string;
  bottomMetric?: string;
  options?: FontMetricsOptions;
};

const useFitText = ({
  text,
  fontFamily,
  fontStyle = '',
  fontWeight = '',
  maxWidth,
  maxHeight,
  topMetric = 'top',
  bottomMetric = 'bottom',
  options,
}: Props) => {
  if (typeof document === 'undefined') return initialFitResult;

  const [metrics] = useFontMetrics(fontFamily, {
    fontStyle,
    fontWeight,
    origin: 'baseline',
    ...options,
  });

  console.log(text, 'FONT METRICS: ', metrics);

  const containerRatio = maxWidth / maxHeight;

  const canvas = document.createElement('canvas');
  const ctx: CanvasRenderingContext2D = canvas.getContext('2d')!;
  const canvasFontSize = 48;
  ctx.font = `${fontStyle} ${fontWeight} ${canvasFontSize}px ${fontFamily}`;
  const textWidth = ctx.measureText(text).width;
  const textHeight =
    canvasFontSize *
    (metrics.offsets[bottomMetric as keyof FontOffsets] -
      metrics.offsets[topMetric as keyof FontOffsets]);
  const textRatio = textWidth / textHeight;
  console.log('RATIO: ', textRatio);

  let fontSize: number;
  let width: number;
  let height: number;

  if (textRatio <= containerRatio) {
    // Text can fit inside Container at maxHeight
    fontSize =
      // (0.995 * maxHeight) /
      maxHeight /
      (metrics.offsets[bottomMetric as keyof FontOffsets] -
        metrics.offsets[topMetric as keyof FontOffsets]);
    width = maxHeight * textRatio;
    height = maxHeight;
  } else {
    // Text has to be shrinked
    fontSize =
      // (0.995 * maxWidth) /
      maxWidth /
      (textRatio *
        (metrics.offsets[bottomMetric as keyof FontOffsets] -
          metrics.offsets[topMetric as keyof FontOffsets]));
    width = maxWidth;
    height = maxWidth / textRatio;
  }
  const fullHeight =
    (height * (metrics.offsets.descent - metrics.offsets.ascent)) /
    //(height * (metrics.offsets.bottom - metrics.offsets.top)) /
    (metrics.offsets[bottomMetric as keyof FontOffsets] -
      metrics.offsets[topMetric as keyof FontOffsets]);
  const offset = metrics.offsets[bottomMetric as keyof FontOffsets] * fontSize;
  const fullOffset = metrics.offsets.descent * fontSize;

  return { fontSize, width, height, fullHeight, offset, fullOffset };
};

export default useFitText;

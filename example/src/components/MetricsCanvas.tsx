import * as React from 'react';
import { FC, useEffect, useRef, useState } from 'react';
import { useFontMetrics } from '../../../.';
import { MetricsParameters } from './MetricsParameters';
import { GeneralParameters } from './GeneralParameters';

const offsetColors = {
  top: 'rgb(136,174,225)',
  ascent: 'rgb(135,170,35)',
  tittle: 'rgb(171,118,242)',
  upper: 'rgb(62,195,73)',
  lower: 'rgb(246,66,208)',
  baseline: 'rgb(132,183,143)',
  bottom: 'rgb(207,70,88)',
  descent: 'rgb(247,147,30)',
  reserved2: 'rgb(144,112,94)',
  reserved3: 'rgb(253,89,23)',
};

type Props = {
  generalParameters: GeneralParameters;
  metricsParameters: MetricsParameters;
};

const MetricsCanvas: FC<Props> = ({
  generalParameters,
  metricsParameters,
}: Props) => {
  const fontWeight = generalParameters.bold ? 'bold' : 'normal';
  const fontStyle = generalParameters.italic ? 'italic' : '';
  const [metrics] = useFontMetrics(generalParameters.fontFamily, {
    origin: 'top',
    fontStyle,
    fontWeight,
    capHeight: metricsParameters.offsetChars['upper'],
    xHeight: metricsParameters.offsetChars['lower'],
    descent: metricsParameters.offsetChars['descent'],
    ascent: metricsParameters.offsetChars['ascent'],
    tittle: metricsParameters.offsetChars['tittle'],
    baseline: metricsParameters.offsetChars['baseline'],
  });
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (
      typeof window === 'undefined' ||
      !containerRef.current ||
      !canvasRef.current
    )
      return;

    const printLine = (
      ctx: CanvasRenderingContext2D,
      offset: number,
      color: string
    ) => {
      ctx!.strokeStyle = color;
      ctx!.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(0, padding + offset * fontSize * pixelRatio);
      ctx.lineTo(ctx!.canvas.width, padding + offset * fontSize * pixelRatio);
      ctx.stroke();
    };

    const pixelRatio =
      typeof window !== 'undefined' ? window.devicePixelRatio : 1;
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;
    const fontSize = Math.min(width / 6, height / 2);
    // const fontSize = 60;
    // const height = Math.ceil(fontSize * 2);
    // const width = height * 3;
    const padding = Math.ceil(fontSize * 0.5);
    const canvas = canvasRef.current;
    canvas.width = width * pixelRatio;
    canvas.height = height * pixelRatio;
    canvas.style.width = '90%'; //`${width}px`;
    canvas.style.height = '90%'; //`${height}px`;
    const ctx = canvas!.getContext('2d');
    ctx!.fillStyle = '#AAEEEE';
    ctx!.fillRect(0, 0, ctx!.canvas.width, ctx!.canvas.height);
    ctx!.font = `${fontStyle} ${fontWeight} ${fontSize * pixelRatio}px ${
      generalParameters.fontFamily
    }`;
    ctx!.fillStyle = 'black';
    ctx!.textBaseline = 'top';
    ctx!.fillText(
      generalParameters.text,
      0,
      padding + metrics.offsets.top * fontSize * pixelRatio
    );
    metricsParameters.visibleOffsets.forEach(offset =>
      printLine(ctx!, metrics.offsets[offset], offsetColors[offset])
    );
  }, [fontStyle, fontWeight, metricsParameters, metrics]);
  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%' }}>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default MetricsCanvas;

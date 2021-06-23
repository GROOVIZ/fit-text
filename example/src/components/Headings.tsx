import * as React from 'react';
import { FittedText, TextAlign } from '../../../.';

type Props = {
  text: string;
};

export const H1: React.FC<Props> = ({ text }) => (
  <h1>
    <FittedText
      text={text}
      topMetric="upper"
      bottomMetric="baseline"
      align={TextAlign.middle}
    ></FittedText>
  </h1>
);

export const H2: React.FC<Props> = ({ text }) => (
  <h2>
    <FittedText
      text={text}
      topMetric="upper"
      bottomMetric="baseline"
      align={TextAlign.middle}
    ></FittedText>
  </h2>
);

export const H3: React.FC<Props> = ({ text }) => (
  <h3>
    <FittedText
      text={text}
      topMetric="upper"
      bottomMetric="baseline"
      align={TextAlign.start}
    ></FittedText>
  </h3>
);

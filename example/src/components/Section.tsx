import * as React from 'react';
import { FittedText, TextAlign } from '../../../.';

type Props = {
  type: string;
  title?: string;
};

export const Section: React.FC<Props> = ({ type, title, children }) => (
  <div className={`section ${type}`}>
    {!!title && (
      <div className="title">
        <FittedText
          text={title}
          topMetric="upper"
          bottomMetric="baseline"
          align={TextAlign.end}
        ></FittedText>
      </div>
    )}
    <div className="inner">{children}</div>
  </div>
);

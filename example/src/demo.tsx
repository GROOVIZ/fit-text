import * as React from 'react';
import { useState } from 'react';
import {
  GeneralParametersForm,
  GeneralParameters,
  MetricsParametersForm,
  MetricsParameters,
  FitTextParametersForm,
  FitTextParameters,
  MetricsCanvas,
  H1,
  H2,
  H3,
  Section,
} from './components';
import { FittedText, TextAlign, TextDirection, FontOffsetNames } from '../../.';

export default function Demo() {
  const [generalParameters, setGeneralParameters] = useState<GeneralParameters>(
    {
      fontFamily: 'Sabado',
      text: 'SupArHheifno',
      bold: false,
      italic: false,
    }
  );
  const fontWeight = generalParameters.bold ? 'bold' : 'normal';
  const fontStyle = generalParameters.italic ? 'italic' : '';
  const [metricsParameters, setMetricsParameters] = useState<MetricsParameters>(
    {
      visibleOffsets: Object.values(FontOffsetNames),
      offsetChars: {
        upper: 'H',
        lower: 'x',
        descent: 'p',
        ascent: 'h',
        tittle: 'i',
        baseline: 'n',
      },
    }
  );
  const [fitTextParameters, setFitTextParameters] = useState<FitTextParameters>(
    {
      width: 600,
      height: 100,
      topMetric: FontOffsetNames.ascent,
      bottomMetric: FontOffsetNames.descent,
      align: TextAlign.start,
      verticalAlign: TextAlign.end,
      direction: TextDirection.right,
    }
  );

  return (
    <>
      <div className="cover" />
      <div className="container">
        <H1 text="React Fit Text" />
        <H2 text="Custom Hook and Component to Fit Text in your React &amp; NextJS Apps" />
        <br />
        <p>
          This React Package is brought to you by the{' '}
          <a href="https://grooviz.com">GROOVIZ Team!</a>
        </p>
        <p>
          It depends on{' '}
          <a href="https://www.npmjs.com/package/@grooviz/font-metrics">
            @grooviz/font-metrics
          </a>
          , another package from <a href="https://grooviz.com">GROOVIZ</a> used
          to calculate a given Font Metrics.
        </p>
        <p>
          You will find the{' '}
          <a href="https://github.com/GROOVIZ/fit-text">Source Code</a> and the{' '}
          <a href="https://github.com/GROOVIZ/fit-text/issues">Issue Tracker</a>{' '}
          on GitHub.
        </p>
        <br />
        <H3 text="Demo Description" />
        <p>
          In this short Demo, we help you discover the main features of our Fit
          Text package based on three levels of parameters.
        </p>
        <ol>
          <li>
            <b>General parameters</b>
            <br />
            Define your text sample, font family and style.
            <br />
          </li>
          <li>
            <b>Font Metrics parameters</b>
            <br />
            Based on the font, the characters used to compute the Font Metrics
            should sometimes be configured. We provide a set of defaults for
            each of the demo fonts.
            <br />
          </li>
          <li>
            <b>Fit Text parameters</b>
            <br />
            And finaly, the main parameter of our FittedText Component.
            <br />
            <ol>
              <li>The size (width and height) of the parent container</li>
              <li>
                The top &amp; bottom metrics used to fit the text vertically
              </li>
              <li>The horizontal &amp; vertical alignment</li>
              <li>The direction of the text</li>
            </ol>
            <br />
          </li>
        </ol>
        <p>
          After you configured all these parameters, check the generated source
          code at the bottom of the Demo.
        </p>
        <br />
        <Section type="form" title="Font Metrics Params">
          <div
            style={{
              display: 'grid',
              width: '100%',
              gridTemplateColumns: '1fr 2fr',
            }}
          >
            <GeneralParametersForm
              params={generalParameters}
              onParamsChange={setGeneralParameters}
            />
            <MetricsParametersForm
              params={metricsParameters}
              onParamsChange={setMetricsParameters}
            />
          </div>
        </Section>
        <br />
        <br />
        <div className="canvas1">
          <MetricsCanvas
            generalParameters={generalParameters}
            metricsParameters={metricsParameters}
          />
        </div>
        <br />
        <br />
        <br />
        <Section type="form" title="Fit Text Params">
          <div
            style={{
              display: 'grid',
              width: '100%',
              gridTemplateColumns: '30% 1fr',
            }}
          >
            <div>
              <FitTextParametersForm
                params={fitTextParameters}
                onParamsChange={setFitTextParameters}
              />
            </div>
            <div
              style={{
                position: 'relative',
                backgroundColor: 'beige',
                width: `${fitTextParameters.width}px`,
                height: `${fitTextParameters.height}px`,
                margin: '20px 0',
                fontFamily: generalParameters.fontFamily,
                fontStyle,
                fontWeight,
              }}
            >
              <FittedText
                text={generalParameters.text}
                topMetric={fitTextParameters.topMetric}
                bottomMetric={fitTextParameters.bottomMetric}
                align={fitTextParameters.align}
                verticalAlign={fitTextParameters.verticalAlign}
                direction={fitTextParameters.direction}
                options={{
                  fontStyle: fontStyle,
                  fontWeight: fontWeight,
                  capHeight: metricsParameters.offsetChars['upper'],
                  xHeight: metricsParameters.offsetChars['lower'],
                  descent: metricsParameters.offsetChars['descent'],
                  ascent: metricsParameters.offsetChars['ascent'],
                  tittle: metricsParameters.offsetChars['tittle'],
                  baseline: metricsParameters.offsetChars['baseline'],
                }}
              ></FittedText>
            </div>
          </div>
        </Section>
        <br />
        <br />
      </div>
    </>
  );
}

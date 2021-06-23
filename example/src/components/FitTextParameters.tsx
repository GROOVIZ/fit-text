import * as React from 'react';
import { FC } from 'react';
import { FontOffsetNames, TextAlign, TextDirection } from '../../../.';

export type FitTextParameters = {
  width: number;
  height: number;
  topMetric: FontOffsetNames;
  bottomMetric: FontOffsetNames;
  align: TextAlign;
  verticalAlign: TextAlign;
  direction: TextDirection;
};

type Props = {
  params: FitTextParameters;
  onParamsChange: (params: FitTextParameters) => void;
};

const FitTextParametersForm: FC<Props> = ({
  params,
  onParamsChange,
}: Props) => {
  const setWidth = (value: number) =>
    onParamsChange({
      ...params,
      width: value,
    });
  const setHeight = (value: number) =>
    onParamsChange({
      ...params,
      height: value,
    });
  const setTopMetric = (offset: FontOffsetNames) => {
    onParamsChange({
      ...params,
      topMetric: offset,
    });
  };
  const setBottomMetric = (offset: FontOffsetNames) => {
    onParamsChange({
      ...params,
      bottomMetric: offset,
    });
  };
  const setAlign = (align: TextAlign) => {
    onParamsChange({
      ...params,
      align,
    });
  };
  const setVerticalAlign = (align: TextAlign) => {
    onParamsChange({
      ...params,
      verticalAlign: align,
    });
  };
  const setDirection = (direction: TextDirection) =>
    onParamsChange({ ...params, direction });

  return (
    <>
      <table>
        <tbody>
          <tr>
            <td>Width:</td>
            <td>
              <input
                type="range"
                min="10"
                max="600"
                value={params.width}
                onChange={e => setWidth(+e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>Height:</td>
            <td>
              <input
                type="range"
                min="10"
                max="400"
                value={params.height}
                onChange={e => setHeight(+e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>Top Metric:</td>
            <td>
              <select
                value={params.topMetric}
                onChange={e => setTopMetric(e.target.value as FontOffsetNames)}
              >
                {Object.values(FontOffsetNames).map(offsetName => (
                  <option value={offsetName} key={`top_${offsetName}`}>
                    {offsetName}
                  </option>
                ))}
              </select>
            </td>
          </tr>
          <tr>
            <td>Bottom Metric:</td>
            <td>
              <select
                value={params.bottomMetric}
                onChange={e =>
                  setBottomMetric(e.target.value as FontOffsetNames)
                }
              >
                {Object.values(FontOffsetNames).map(offsetName => (
                  <option value={offsetName} key={`bottom_${offsetName}`}>
                    {offsetName}
                  </option>
                ))}
              </select>
            </td>
          </tr>
          <tr>
            <td>Align:</td>
            <td>
              <select
                value={params.align}
                onChange={e => setAlign(e.target.value as TextAlign)}
              >
                <option value="start">start</option>
                <option value="middle">middle</option>
                <option value="end">end</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>Secondary Align:</td>
            <td>
              <select
                value={params.verticalAlign}
                onChange={e => setVerticalAlign(e.target.value as TextAlign)}
              >
                <option value="start">start</option>
                <option value="middle">middle</option>
                <option value="end">end</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>Direction:</td>
            <td>
              <select
                value={params.direction}
                onChange={e => setDirection(e.target.value as TextDirection)}
              >
                <option value="right">right (default)</option>
                <option value="bottom">bottom</option>
                <option value="left">left</option>
                <option value="top">top</option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default FitTextParametersForm;

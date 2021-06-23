import * as React from 'react';
import { FC, useEffect, useRef } from 'react';
import { FontOffsetNames } from '../../../.';

export type MetricsParameters = {
  visibleOffsets: Array<FontOffsetNames>;
  offsetChars: { [key: string]: string };
};

type Props = {
  params: MetricsParameters;
  onParamsChange: (params: MetricsParameters) => void;
};

const MetricsParametersForm: FC<Props> = ({
  params,
  onParamsChange,
}: Props) => {
  const allOffsetCheckboxRef = useRef<HTMLInputElement>(null);
  const toggleOffset = (offsetName: FontOffsetNames) =>
    onParamsChange({
      ...params,
      visibleOffsets: params.visibleOffsets.includes(offsetName)
        ? params.visibleOffsets.filter(x => x !== offsetName)
        : [...params.visibleOffsets, offsetName],
    });
  const toggleAllOffset = () =>
    onParamsChange({
      ...params,
      visibleOffsets:
        params.visibleOffsets.length === Object.values(FontOffsetNames).length
          ? []
          : Object.values(FontOffsetNames),
    });
  const setOffsetChar = (offsetName: FontOffsetNames, char: string) =>
    onParamsChange({
      ...params,
      offsetChars: { ...params.offsetChars, [offsetName]: char[0] },
    });

  useEffect(() => {
    if (!allOffsetCheckboxRef.current) return;
    allOffsetCheckboxRef.current!.indeterminate =
      params.visibleOffsets.length > 0 &&
      params.visibleOffsets.length < Object.values(FontOffsetNames).length;
    allOffsetCheckboxRef.current!.checked =
      params.visibleOffsets.length === Object.values(FontOffsetNames).length;
  }, [params]);

  return (
    <>
      <div
        style={{
          display: 'grid',
          width: '100%',
          gridTemplateColumns: '1fr 1fr 1fr',
        }}
      >
        <div
          style={{
            display: 'grid',
            width: '100%',
            gridTemplateColumns: '1fr 3fr 1fr',
          }}
          key="all"
        >
          <input
            type="checkbox"
            ref={allOffsetCheckboxRef}
            onChange={() => toggleAllOffset()}
          />
          <span>All</span>
          <span></span>
        </div>
        {Object.values(FontOffsetNames).map(offsetName => (
          <div
            style={{
              display: 'grid',
              width: '100%',
              gridTemplateColumns: '1fr 3fr 1fr',
            }}
            key={offsetName}
          >
            <input
              type="checkbox"
              checked={params.visibleOffsets.includes(offsetName)}
              onChange={() => toggleOffset(offsetName)}
            />
            <span>{offsetName}</span>
            <div>
              {!['top', 'bottom'].includes(offsetName) && (
                <input
                  type="text"
                  value={params.offsetChars[offsetName]}
                  onChange={e => setOffsetChar(offsetName, e.target.value)}
                  size={1}
                  style={{ textAlign: 'center' }}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default MetricsParametersForm;

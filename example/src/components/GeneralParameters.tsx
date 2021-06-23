import * as React from 'react';
import { FC } from 'react';

export type GeneralParameters = {
  text: string;
  fontFamily: string;
  bold: boolean;
  italic: boolean;
};

type Props = {
  params: GeneralParameters;
  onParamsChange: (params: GeneralParameters) => void;
};

const GeneralParametersForm: FC<Props> = ({
  params,
  onParamsChange,
}: Props) => {
  const setFontFamily = (fontFamily: string) =>
    onParamsChange({ ...params, fontFamily });
  const setText = (text: string) => onParamsChange({ ...params, text });
  const toggleBold = () => onParamsChange({ ...params, bold: !params.bold });
  const toggleItalic = () =>
    onParamsChange({ ...params, italic: !params.italic });
  return (
    <>
      <table>
        <tbody>
          <tr>
            <td>Text:</td>
            <td>
              <input
                type="text"
                placeholder="Input some text"
                onChange={e => setText(e.target.value)}
                value={params.text}
              />
            </td>
          </tr>
          <tr>
            <td>Font:</td>
            <td>
              <select
                value={params.fontFamily}
                onChange={e => setFontFamily(e.target.value)}
              >
                <option value="Catamaran">Catamaran</option>
                <option value="Arial">Arial</option>
                <option value="Staatliches">Staatliches</option>
                <option value="Syne">Syne</option>
                <option value="Sabado">Sabado</option>
                <option value="Verdana">Verdana</option>
                <option value="Georgia">Georgia</option>
                <option value="Courier New">Courier New</option>
                <option value="Brush Script MT">Brush Script MT</option>
                <option value="Impact">Impact</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>Bold:</td>
            <td>
              <input
                type="checkbox"
                checked={params.bold}
                onChange={() => toggleBold()}
              />
            </td>
          </tr>
          <tr>
            <td>Italic:</td>
            <td>
              <input
                type="checkbox"
                checked={params.italic}
                onChange={() => toggleItalic()}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default GeneralParametersForm;

import { TemplateResult, html, nothing } from 'lit';
import {
  MarginState,
  PaddingState,
} from '../../AppState/State/FourDimensionLengthState';
import { FontState } from '../../AppState/State/FontState';

export const optionalHtml =
  (label: string, toggleHandler: () => void) =>
  (
    templateStrings: TemplateStringsArray,
    ...values: Array<unknown>
  ): TemplateResult => {
    const valueIndex = templateStrings.findIndex((templateString) =>
      templateString.includes('value')
    );
    const actualValue: any = values[valueIndex];
    const hasValue = ![null, undefined].includes(actualValue);
    return html`<eb-optional-wrapper-checkbox
      label=${label}
      @change=${toggleHandler}
      ?checked=${hasValue}
    >
      ${hasValue ? html(templateStrings, ...values) : nothing}
    </eb-optional-wrapper-checkbox>`;
  };

export function renderPadding<State extends PaddingState>(
  state: State
): string {
  return [
    state.paddingTop,
    state.paddingRight,
    state.paddingBottom,
    state.paddingLeft,
  ].join(' ');
}

export function renderMargin<State extends MarginState>(state: State): string {
  return [
    state.marginTop,
    state.marginRight,
    state.marginBottom,
    state.marginLeft,
  ].join(' ');
}

// eslint-disable-next-line max-lines-per-function
export function fontStatesAsTemplate(
  fontState: FontState,
  templateType: 'style' | 'mjml-attribute'
): string {
  type FontRecord = Readonly<[string | undefined, string | number | undefined]>;
  const isStyle = templateType === 'style';
  const mapper = isStyle
    ? ([key, value]: FontRecord): string => `${key}:${value}`
    : ([key, value]: FontRecord): string => `${key}="${value}"`;
  const separator = isStyle ? ';' : ' ';
  return (
    [
      ['font-family', fontState.fontFamily],
      ['font-size', fontState.size],
      [isStyle ? 'text-align' : 'align', fontState.alignment],
      ['font-weight', fontState.weight],
      ['color', fontState.color],
      ['font-style', fontState.fontStyle],
      ['text-decoration', fontState.textDecoration],
      ['text-transform', fontState.textTransform],
      ['line-height', fontState.lineHeight],
      ['letter-spacing', fontState.letterSpacing],
    ] as const
  )
    .filter(([_key, value]) => value !== undefined && value !== null)
    .map(mapper)
    .join(separator);
}

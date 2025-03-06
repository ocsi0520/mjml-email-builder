import { TemplateResult, html } from 'lit';
import { LocalizationRecord } from '../localization.type';

export const renderSelectOptions = <T extends string>(
  values: Readonly<Array<T>>,
  localisations: LocalizationRecord<T>,
  selected: T
): TemplateResult[] =>
  values.map(
    (value) => html`
      <option value=${value as string} ?selected=${value === selected}>
        ${localisations[value]?.() ?? value}
      </option>
    `
  );

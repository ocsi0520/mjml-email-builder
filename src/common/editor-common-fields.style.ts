import { css } from 'lit';

// TODO: check whether we can merge with StateEditorLit.baseStyles
// because they are used together all the time
export const commonFieldStyles = css`
  select {
    background-color: transparent;
    color: var(--white);
    border: none;
    border-bottom: 1px solid var(--violet);
  }
  select,
  option {
    text-transform: capitalize;
  }
  .border-style {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    max-height: 25px;
    padding-left: 0;
  }
  .container eb-length-input::part(label) {
    font-weight: bold;
  }
  fieldset {
    padding-left: 0;
    margin-left: 0;
    margin-right: 0;
    padding-right: 0;
    border: none;
  }
  option {
    background: var(--black);
  }
  p {
    margin: 0;
  }
`;

export const commonInputComponentStyle = css`
  input,
  select {
    display: inline-block;
    background-color: var(--black-lighter);
    color: var(--white);
    font-size: 15px;
    outline: none;
    border: var(--mallow-medium) solid 1px;
    padding: 3px;
  }
  input {
    width: 40px;
  }
  input[type='color'] {
    padding: 0;
  }
  input[type='text'],
  input[type='file'] {
    width: 95%;
  }
  input[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  select {
    width: auto;
    text-align: right;
  }
  label {
    margin-right: auto;
    color: var(--white);
  }
  option {
    background: var(--black);
  }
`;

export const commonSettingsStyles = css`
  .setting-main-title {
    color: var(--white);
    background-color: var(--black);
    border-top: 1px solid var(--grey-medium);
    border-bottom: 1px solid var(--grey-medium);
    margin: 0 0 10px 0;
    display: flex;
    justify-content: space-between;
  }
  .setting-title {
    color: var(--white);
    background-color: var(--black);
    padding: 8px 0 8px 10px;
    margin-top: 20px;
  }
  .setting-container {
    color: var(--white);
    padding-left: var(--sidepanel-side-padding);
  }
  .setting-select {
    display: flex;
    justify-content: space-between;
    align-items: center;
    overflow: hidden;
    padding-left: 0px;
    color: var(--white);
  }
  .setting-left-padding {
    padding-left: var(--sidepanel-side-padding);
  }
  .setting-right-padding {
    padding-right: var(--sidepanel-side-padding);
  }
  .setting-item {
    border-bottom: var(--grey-medium) 2px solid;
    padding: 10px 5px 5px var(--sidepanel-side-padding);
  }
  .setting-item-without-left-padding {
    border-bottom: var(--grey-medium) 2px solid;
    padding: 10px 5px 5px 0;
  }

  .setting-left-margin {
    margin-left: var(--sidepanel-side-padding);
  }
`;

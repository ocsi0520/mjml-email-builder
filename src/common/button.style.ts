import { css } from 'lit';

export const buttonCss = css`
  button {
    color: var(--violet);
    cursor: pointer;
    font-family: 'Poppins', sans-serif;
    font-size: 12px;
    margin: 0;
    padding: 0 10px;
    text-align: center;
    transition: color 0.13s ease-in-out, background 0.13s ease-in-out,
      opacity 0.13s ease-in-out, box-shadow 0.13s ease-in-out;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
  }

  button:hover {
    background-color: var(--violet);
    color: var(--white);
    box-shadow: var(--violet-light) 0px 0px 5px;
  }

  button:active {
    background-color: var(--violet);
    color: var(--white);
  }

  button:disabled {
    background-color: var(--grey-dark);
    cursor: not-allowed;
    color: var(--white);
    border: 1px solid var(--grey-dark);
  }
`;

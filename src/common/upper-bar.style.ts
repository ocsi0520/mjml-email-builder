import { css } from 'lit';

export const upperBarCSS = css`
  div.upper-bar {
    height: var(--selector-upper-bar-height);
    overflow: hidden;
    white-space: nowrap;
    padding: 0 15px;
    position: relative;
  }
  div.edge,
  div.icons {
    background-color: var(--highlight-color);
  }
  div.icons > img {
    height: var(--selector-upper-bar-height, 20px);
    pointer-events: auto;
    cursor: pointer;
  }
  div.edge {
    /* unfortunately it seems like in calc there can be only 1 unit from 1 type,
    so we should define css variables without units */
    /*
      width =  Math.sqrt(--selector-upper-bar-height ** 2 + desiredWidth**2)
      desiredWidth = --selector-upper-bar-height * sin(desiredAngle)
    */
    /* result for 60deg: sqrt((sin(60deg) * 25) ** 2 + 25 ** 2) */
    width: 33.0718913882px;
    display: inline-block;
    height: var(--selector-upper-bar-height, 25px);
    position: absolute;
    z-index: -1;
  }
  div.left-edge {
    transform-origin: top right;
    transform: rotateZ(calc(-1 * var(--edge-rotate, 60deg)));
    left: -18px;
  }
  div.right-edge {
    transform-origin: top left;
    transform: rotateZ(var(--edge-rotate, 60deg));
    right: -18px;
  }
`;

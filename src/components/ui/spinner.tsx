import { css } from 'styled-components'

/** Spinner component */
const Spinner = () => {
  return <div css={styles.spinner}></div>
}

const styles = {
  spinner: css`
    display: inline-block;
    width: 80px;
    height: 80px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    &:after {
      content: '';
      display: block;
      width: 64px;
      height: 64px;
      margin: 8px;
      border-radius: 50%;
      border: 6px solid #fff;
      border-color: #1677ff transparent #1677ff transparent;
      animation: spinner 1.2s linear infinite;
    }
    @keyframes spinner {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  `,
}

export { Spinner }

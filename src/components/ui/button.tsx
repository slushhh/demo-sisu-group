import { css } from 'styled-components'

import type { ButtonHTMLAttributes } from 'react'

type Props = ButtonHTMLAttributes<HTMLButtonElement>

/** Button component */
const Button = (props: Props) => {
  return (
    <button
      css={styles.button}
      {...props}
    >
      {props.children}
    </button>
  )
}

const styles = {
  button: css`
    color: #fafafa;
    font-weight: 500;
    font-size: 14px;
    padding: 5px 20px;
    background-color: #18181b;
    border-radius: 4px;
    cursor: pointer;
    transition-property:
      color, background-color, border-color, text-decoration-color, fill, stroke;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 0.15s;

    &:hover {
      background-color: rgb(24 24 27 / 80%);
    }

    &:disabled {
      cursor: not-allowed;
      color: rgba(0, 0, 0, 0.25);
      background-color: rgba(0, 0, 0, 0.04);
      border-color: #d9d9d9;
    }
  `,
}

export { Button }

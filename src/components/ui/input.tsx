import { css } from 'styled-components'
import cls from 'classnames'

import type { DetailedHTMLProps, InputHTMLAttributes } from 'react'

type Props = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  /** Useful for displaying validation status */
  status?: 'error' | 'warning' | null

  /** Changes the appearance of the input */
  mode?: 'editableDiv' | 'nonEditableDiv'
}

/** Input component */
const Input = (props: Props) => {
  const { status, mode, className, ...other } = props

  const wrapperClassName = cls(className, {
    editableDiv: mode === 'editableDiv',
  })

  const inputClassName = cls({
    error: status === 'error',
    warning: status === 'warning',
    editableDiv: mode === 'editableDiv',
    nonEditableDiv: mode === 'nonEditableDiv',
  })

  return (
    <div
      css={styles.wrapper}
      className={wrapperClassName}
    >
      <input
        {...other}
        css={styles.input}
        type={props.type || 'text'}
        className={inputClassName}
        disabled={mode === 'nonEditableDiv'}
      />
    </div>
  )
}

const styles = {
  wrapper: css`
    position: relative;

    &.editableDiv::after {
      content: '';
      position: absolute;
      height: 1px;
      width: 100%;
      background-color: #e4e4e7;
      bottom: -5px;
      left: 0;
    }
  `,

  input: css`
    min-width: 320px;
    height: 35px;
    font-size: 14px;
    padding: 0 12px;
    border-color: #e4e4e7;
    border-width: 1px;
    border-radius: 4px;
    position: relative;

    &.warning {
      border-color: orange;
    }

    &.error {
      border-color: red;
    }

    &.editableDiv {
      padding: 0;
      border: none;
      border-radius: 0;
      outline: none;
      top: 10px;
    }

    &.nonEditableDiv {
      padding: 0;
      border: none;
      border-radius: 0;
      cursor: default;
      top: 10px;
    }
  `,
}

export { Input }

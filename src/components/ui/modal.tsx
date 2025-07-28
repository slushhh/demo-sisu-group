import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { css, createGlobalStyle } from 'styled-components'

import type { PropsWithChildren } from 'react'

type Props = PropsWithChildren & {
  /** Displays a modal window */
  open?: boolean

  /** Whether to display the overlay */
  overlay?: boolean

  /**
   * Triggers a function when the modal
   * window is closed
   */
  onClose?: () => void
}

/** Modal component */
const Modal = (props: Props) => {
  const { open, children, overlay = true } = props

  useEffect(() => {
    /** Closes the window when Esc is pressed */
    const escHandler = (ev: KeyboardEvent) => {
      if (ev.key.toLowerCase() === 'escape') onClose()
    }

    if (open) addEventListener('keydown', escHandler)
    return () => removeEventListener('keydown', escHandler)
  }, [open])

  const onClose = () => {
    props.onClose?.()
  }

  return (
    (open &&
      createPortal(
        <>
          {overlay && (
            <>
              <GlobalStyle />
              <div
                onClick={onClose}
                css={styles.overlay}
              />
            </>
          )}

          <div css={styles.wrapper}>{children}</div>
        </>,
        document.body,
      )) ||
    null
  )
}

const GlobalStyle = createGlobalStyle`
  body {
    overflow: hidden;
  }
`

const styles = {
  wrapper: css`
    border-radius: 4px;
    overflow: hidden;
    max-width: 50%;
    padding: 15px;
    position: absolute;
    top: 30%;
    left: 50%;
    box-shadow: 5px 5px 10px 0 darkgray;
    animation: open-modal 200ms forwards linear;
    transform: translate(-50%, -30%);
    z-index: 1000;
    background-color: white;

    @keyframes open-modal {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  `,

  overlay: css`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 999;
    animation: overlay 200ms forwards linear;

    @keyframes overlay {
      from {
        background-color: transparent;
      }
      to {
        background-color: rgba(0, 0, 0, 0.2);
      }
    }
  `,
}

export { Modal }

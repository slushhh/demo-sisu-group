import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { css } from 'styled-components'

export type Notification = {
  /** Notification type, can change its visual representation */
  type?: 'normal' | 'success' | 'warning' | 'error'

  /** Notification header */
  title?: string

  /** Notification header */
  content?: string
}

/**
 * Notifications API. The observer is
 * used to keep the component self-contained
 * and not to depend on an external state
 */
// eslint-disable-next-line react-refresh/only-export-components
export const notificationApi = {
  subscribers: [] as Array<(args?: object) => void>,

  subscribe(func: (args?: object) => void) {
    return this.subscribers.push(func)
  },

  unsubscribe(index: number) {
    this.subscribers = [].splice(index - 1, 1)
  },

  trigger(args?: object) {
    this.subscribers.map(subs => subs(args))
  },
}

/** Notification component */
const Notification = () => {
  const [content, setContent] = useState<Notification>()
  const [open, setOpen] = useState(false)

  /** To gain direct access to the wrapper */
  const wrapper = useRef<HTMLDivElement>(null)

  /**
   * The function is called every time
   * an external call triggers the API
   */
  const onTrigger = (params?: Notification) => {
    setContent({
      type: params?.type || 'normal',
      title: params?.title || 'Notification',
      content: params?.content || 'Put your content here',
    })

    setOpen(true)
  }

  // In this effect, we control the timers
  // that are responsible for the notifier
  // closing animation
  useEffect(() => {
    // We use two timers, the first one
    // is responsible for activating the CSS
    // animation of the window closing.
    // The second one will unmount the component
    // after the animation is completed
    let close: NodeJS.Timeout
    let unmount: NodeJS.Timeout

    if (open) {
      close = setTimeout(() => wrapper.current?.classList.add('close'), 4000)
      unmount = setTimeout(() => setOpen(false), 5000)
    }

    // Clear the timer when unmounting a
    // component so that the event listener
    // won't leak out
    return () => {
      clearTimeout(close)
      clearTimeout(unmount)
    }
  }, [open, content])

  useEffect(() => {
    // Subscribing to the observer
    const index = notificationApi.subscribe(onTrigger)
    return () => notificationApi.unsubscribe(index)
  }, [])

  return (
    (open &&
      createPortal(
        <>
          <div
            ref={wrapper}
            css={styles.wrapper}
          >
            <div css={styles.title}>{content?.title}</div>
            <div css={styles.content}>{content?.content}</div>
          </div>
        </>,
        document.body,
      )) ||
    null
  )
}

const styles = {
  wrapper: css`
    max-width: 320px;
    position: fixed;
    right: 30px;
    bottom: 30px;
    padding: 20px 24px;
    overflow: hidden;
    word-wrap: break-word;
    border-radius: 4px;
    box-shadow:
      0 6px 16px 0 rgba(0, 0, 0, 0.08),
      0 3px 6px -4px rgba(0, 0, 0, 0.12),
      0 9px 28px 8px rgba(0, 0, 0, 0.05);
    background-color: #fff;

    animation: open-modal;
    animation-duration: 300ms;
    animation-timing-function: linear;
    animation-fill-mode: forwards;
    animation-delay: 0s;

    z-index: 1050;

    @keyframes open-modal {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    &.close {
      animation: close-modal;
      animation-duration: 300ms;
      animation-timing-function: linear;
      animation-fill-mode: forwards;
      animation-delay: 0s;

      @keyframes close-modal {
        from {
          opacity: 1;
        }
        to {
          opacity: 0;
        }
      }
    }
  `,

  title: css`
    margin-bottom: 8px;
    font-size: 16px;
  `,

  content: css`
    font-size: 14px;
  `,
}

export { Notification }

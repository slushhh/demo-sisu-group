import { css } from 'styled-components'

import type { PropsWithChildren } from 'react'

/** RequiredTag component */
const RequiredTag = (props: PropsWithChildren) => {
  const { children } = props

  return (
    <div>
      {children} <span css={styles.tag}>*</span>
    </div>
  )
}

const styles = {
  tag: css`
    color: red;
    position: absolute;
    transform: translate(2px, -5px);
  `,
}

export { RequiredTag }

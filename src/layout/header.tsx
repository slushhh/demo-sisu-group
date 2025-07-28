import { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router'
import { css } from 'styled-components'

import { Routes } from '@/data'
import { DialogContext, DialogIds } from '@/contexts'
import { useFlags, useSession } from '@/hooks'

import type { MouseEvent } from 'react'

/** App header component */
const Header = () => {
  const dialog = useContext(DialogContext)
  const { isAuthenticated } = useFlags()
  const navigate = useNavigate()
  const { destroySession } = useSession()

  const onCreateAccount = (ev: MouseEvent) => {
    ev.preventDefault()
    dialog.open(DialogIds.createAccount)
  }

  const onLogin = (ev: MouseEvent) => {
    ev.preventDefault()
    dialog.open(DialogIds.login)
  }

  const onLogout = (ev: MouseEvent) => {
    ev.preventDefault()
    destroySession()
    navigate(Routes.Home)
  }

  return (
    <header css={styles.header}>
      <nav css={styles.nav}>
        <NavLink to={Routes.Home}>Home</NavLink>
        {isAuthenticated && <NavLink to={Routes.Profile}>Profile</NavLink>}
        <NavLink to={Routes.About}>About</NavLink>

        {!isAuthenticated ? (
          <>
            <a onClick={onCreateAccount}>Create Account</a>
            <a onClick={onLogin}>Log In</a>
          </>
        ) : (
          <a onClick={onLogout}>Log Out</a>
        )}
      </nav>
    </header>
  )
}

const styles = {
  header: css`
    margin-top: 10px;
    margin-bottom: 40px;
  `,

  nav: css`
    a {
      margin: 8px 10px;

      &:first-child {
        margin-left: 0;
      }

      &:last-child {
        margin-right: 0;
      }
    }
  `,
}

export { Header }

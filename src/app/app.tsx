import { lazy, Suspense, useReducer } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { createGlobalStyle } from 'styled-components'

import { Routes } from '@/data'
import { AppLayout } from '@/layout'
import {
  dialogContext,
  DialogContext,
  DialogIds,
  dialogReducer,
} from '@/contexts'
import { LoginDialog } from '@/components'
import { useAppBootstrap } from '@/hooks'

import { Home } from '@/pages/home'
import { Error } from '@/pages/error'
import { useFlags } from '@/hooks'
import { Notification, Spinner } from '@/components/ui'

import type { RouteObject } from 'react-router'

// Lazy page loading
const Profile = lazy(() => import('@/pages/profile'))
const Logs = lazy(() => import('@/pages/logs'))
const About = lazy(() => import('@/pages/about'))

/** Routes that are available only to an authorized user */
const protectedRoutes: Array<string> = [Routes.Profile]

/**
 * App
 */
const App = () => {
  useAppBootstrap()

  const { isAppReady, isAuthenticated } = useFlags()
  const [dialog, dispatch] = useReducer(dialogReducer, dialogContext)

  /** Opens a dialog with a specific ID */
  const openDialog = (id: DialogIds) => dispatch({ type: 'open', payload: id })

  /** Closes a dialog with a specific ID */
  const closeDialog = (id: DialogIds) =>
    dispatch({ type: 'close', payload: id })

  /** Checks if the path should be protected */
  const protectRoute = (route: RouteObject) => {
    const shouldBeProtected = protectedRoutes.includes(route.path!)

    if (shouldBeProtected && !isAuthenticated) return {}
    return route
  }

  /**
   * The app router, should only be here,
   * since we are using protected routes,
   * which in turn use the app state and flags
   */
  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      errorElement: <Error />,
      children: [
        {
          path: Routes.Home,
          element: <Home />,
        },

        // We physically remove this path if
        // the user is not logged in, so that
        // there is no possibility to go to the
        // page via a direct link
        protectRoute({
          path: Routes.Profile,
          children: [
            {
              index: true,
              element: (
                <Suspense fallback={<Spinner />}>
                  <Profile />
                </Suspense>
              ),
            },

            {
              path: Routes.Logs,
              element: (
                <Suspense fallback={<Spinner />}>
                  <Logs />
                </Suspense>
              ),
            },
          ],
        }),

        {
          path: Routes.About,
          element: (
            <Suspense fallback={<Spinner />}>
              <About />
            </Suspense>
          ),
        },
      ],
    },
  ])

  return (
    <DialogContext.Provider
      value={{ ...dialog, dispatch, open: openDialog, close: closeDialog }}
    >
      <GlobalStyle />
      {isAppReady ? <RouterProvider router={router} /> : <Spinner />}
      <LoginDialog />
      <Notification />
    </DialogContext.Provider>
  )
}

/** Global styles */
const GlobalStyle = createGlobalStyle`
  a {
    color: #71717a;
    text-decoration: none;
    cursor: pointer;
    user-select: none;
    font-size: 14px;
    position: relative;
    padding-bottom: 2px;

    &::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 1px;
      background-color: #19191a;
      left: 0;
      bottom: 0;
      display: none;
    }

    &:hover {
      color: #19191a;

      &::after {
        display: block;
      }
    }
  }

  label {
    line-height: 1;
  }

  h1 {
    color: rgba(0, 0, 0, 0.88);
    font-weight: 600;
    font-size: 38px;
    line-height: 1.2;
    margin: 0;
  }

  h2 {
    color: rgba(0, 0, 0, 0.88);
    font-weight: 600;
    font-size: 30px;
    line-height: 1.3;
    margin: 0;
  }

  h3 {
    color: rgba(0, 0, 0, 0.88);
    font-weight: 600;
    font-size: 24px;
    line-height: 1.3;
    margin: 0;
  }

  h4 {
    color: rgba(0, 0, 0, 0.88);
    font-weight: 600;
    font-size: 20px;
    line-height: 1.4;
    margin: 0;
  }

  h5 {
    color: rgba(0, 0, 0, 0.88);
    font-weight: 600;
    font-size: 16px;
    line-height: 1.5;
    margin: 0;
  }
`

export { App }

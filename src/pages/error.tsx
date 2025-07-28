import { Link } from 'react-router'
import { useRouteError } from 'react-router'

import { Routes } from '@/data/routes'
import * as UI from '@/components/ui'

import type { RouteError } from '@/types'

/**
 * The `ErrorBoundary` used by `ReactRouter`
 * is actually the page that will display all
 * the errors of the app itself, routing errors
 * and everything else
 */
const Error = () => {
  const error = useRouteError() as RouteError

  const backHomeButton = (
    <Link to={Routes.Home}>
      <UI.Button>Back Home</UI.Button>
    </Link>
  )

  return (
    (error.status === 404 && (
      <>
        404 Page not found
        {backHomeButton}
      </>
    )) || (
      <>
        Error
        {error.statusText || error.message}
        {backHomeButton}
      </>
    )
  )
}

export default Error
export { Error }

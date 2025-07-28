import { useSelector } from 'react-redux'

import type { RootState } from '@/store'

/**
 * Flags hook that are used throughout
 * the app. Flags for license checks, user
 * access permissions will be here
 */
const useFlags = () => {
  /**
   * Whether the app is ready to run,
   * all API calls are made, session is
   * loaded, etc.
   */
  const isAppReady = !!useSelector(
    (state: RootState) => state.appSlice.value.isReady,
  )

  /** Whether the user is logged in */
  const isAuthenticated = !!useSelector(
    (state: RootState) => state.userSlice.value.email,
  )

  return { isAppReady, isAuthenticated }
}

export { useFlags }

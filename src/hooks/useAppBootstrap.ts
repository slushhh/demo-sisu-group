import { useDispatch } from 'react-redux'

import * as appActions from '@/store/appSlice'

import { useSession } from '@/hooks'

/**
 * Hook for the app bootstrap. Any
 * operations and manipulations to be
 * performed when the app is launched
 * should be here
 */
const useAppBootstrap = () => {
  const { createSession, getSession } = useSession()
  const dispatch = useDispatch()

  ;(async () => {
    const data = await getSession()

    if (data?.status === 'success') {
      createSession(data.user)
    }

    dispatch(appActions.setReady())
  })()
}

export { useAppBootstrap }

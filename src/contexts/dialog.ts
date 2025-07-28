import { createContext } from 'react'

/**
 * Dialog context
 */
export type DialogContext = {
  id: DialogIds | ''
  open: (id: DialogIds) => void
  close: (id: DialogIds) => void
  dispatch: (params: {
    type: 'open' | 'close'
    payload: 'createAccount' | 'login'
  }) => void
  active: Array<DialogIds>
}

/**
 * Dialog IDs. Consumed by components that
 * render modal windows to know which dialog
 * should be displayed
 */
export type DialogIds = keyof typeof DialogIds
export const DialogIds = Object.freeze({
  createAccount: 'createAccount',
  login: 'login',
})

/**
 * Default values for dialog context
 */
export const dialogContext: DialogContext = {
  id: '',
  open: () => null,
  close: () => null,
  dispatch: () => null,
  active: [],
}

/**
 * Dialog context reducer
 */
export const dialogReducer = (
  dialog: DialogContext,
  action: { type: 'open' | 'close'; payload: 'createAccount' | 'login' },
) => {
  console.log('P', action.payload)
  switch (action.type) {
    case 'open': {
      return {
        ...dialog,
        active: [...dialog.active, action.payload],
      }
    }

    case 'close': {
      return {
        ...dialog,
        active: dialog.active.filter(d => d !== action.payload),
      }
    }

    default: {
      throw Error('Unknown action: ' + action.type)
    }
  }
}

export const DialogContext = createContext<DialogContext>(dialogContext)

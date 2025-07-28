import { useContext, useEffect, useState } from 'react'
import { css } from 'styled-components'

import { DialogContext, DialogIds } from '@/contexts'
import { useSession, useNotification } from '@/hooks'

import * as UI from '@/components/ui'
import * as api from '@/services/api'

import type { FormEvent } from 'react'
import type { APIUser } from '@/types'

/**
 * Statuses of inputs. Change their
 * appearance. Use together with validation
 */
type InputStatus = {
  email: 'warning' | 'error' | null
  password: 'warning' | 'error' | null
}

type LoginDialog = FormEvent<HTMLFormElement> & {
  target: {
    email: HTMLInputElement
    password: HTMLInputElement
  }
}

/** Login dialog component */
const LoginDialog = () => {
  const dialog = useContext(DialogContext)
  const { showNotification } = useNotification()
  const { createSession } = useSession()
  const [dialogId, setDialogId] = useState<DialogIds>()
  const [inputStatus] = useState<InputStatus>()

  // Here we detect when the openDialog
  // event was emitted, whether we are
  // displaying the current one or not
  // Works based on dialog IDs
  useEffect(() => {
    const isLogin = dialog.active.includes(DialogIds.login)
    const isCreateAccount = dialog.active.includes(DialogIds.createAccount)

    if (isLogin || isCreateAccount) {
      if (isLogin) setDialogId(DialogIds.login)
      if (isCreateAccount) setDialogId(DialogIds.createAccount)
    } else {
      setDialogId(null!)
    }
  }, [dialog])

  /**
   * Triggered by a form submit. All
   * validation and data formatting should
   * be here. Initiates a request to the server
   */
  const onSubmit = async (ev: LoginDialog) => {
    ev.preventDefault()

    const email = ev.target.email.value
    const password = ev.target.password.value

    const body = { email, password }

    // This is where you can put the validation of inputs
    // setInputStatus({ email: null, password: 'error' })

    try {
      let req!: string

      if (dialogId === 'createAccount') req = await api.createUser({ body })
      if (dialogId === 'login') req = await api.loginUser({ body })

      const data: APIUser = JSON.parse(req)

      if (data.status === 'success') {
        createSession(data.user)
        dialog.close(dialogId!)
        showNotification({ title: 'Success', content: "You're logged in" })
      }

      if (data.status === 'error') {
        showNotification({ title: 'Error', content: data.message })
      }
    } catch (error) {
      console.log(error)
      // Do nothing, it will fallback to error boundary
    }
  }

  return (
    <UI.Modal
      open={!!dialogId}
      onClose={() => dialog.close(dialogId!)}
    >
      <h3>{dialogId === 'createAccount' ? 'Create account' : 'Login'}</h3>

      <form onSubmit={onSubmit}>
        <fieldset css={styles.fieldset}>
          <div css={styles.field}>
            <label htmlFor='email'>
              <UI.RequiredTag>Email</UI.RequiredTag>
            </label>

            <UI.Input
              type='email'
              id='email'
              status={inputStatus?.email}
              autoComplete='off'
              aria-required='true'
            />
          </div>

          <div css={styles.field}>
            <label htmlFor='password'>
              <UI.RequiredTag>Password</UI.RequiredTag>
            </label>

            <UI.Input
              type='password'
              id='password'
              status={inputStatus?.password}
              aria-required='true'
            />
          </div>
        </fieldset>

        <div css={styles.controls}>
          <UI.Button
            type='reset'
            onClick={() => dialog.close(dialogId!)}
          >
            Cancel
          </UI.Button>
          <UI.Button>Submit</UI.Button>
        </div>
      </form>
    </UI.Modal>
  )
}

const styles = {
  fieldset: css`
    padding: 0;
    margin: 0;
    border: none;
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 20px;
    margin-top: 10px;
  `,

  field: css`
    display: flex;
    flex-direction: column;

    & > label {
      margin-bottom: 5px;
    }
  `,

  controls: css`
    display: flex;
    justify-content: end;

    & > *:first-child {
      margin-right: 10px;
    }
  `,
}

export default LoginDialog
export { LoginDialog }

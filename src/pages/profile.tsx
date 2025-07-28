import { useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router'
import { css } from 'styled-components'

import { useDateTime, useSession, useNotification } from '@/hooks'

import * as UI from '@/components/ui'
import * as api from '@/services/api'
import { Routes } from '@/data'

import type { FormEvent } from 'react'
import type { RootState } from '@/store'
import type { APIUser } from '@/types'

/**
 * Statuses of inputs. Change their
 * appearance. Use together with validation
 */
type InputStatus = {
  email: 'warning' | 'error' | null
  password: 'warning' | 'error' | null
}

type UserProfile = FormEvent<HTMLFormElement> & {
  target: {
    firstName: HTMLInputElement
    lastName: HTMLInputElement
    gender: HTMLInputElement
    phone: HTMLInputElement
    email: HTMLInputElement
    password: HTMLInputElement
    createDate: HTMLInputElement
    updateDate: HTMLInputElement
  }
}

/** User data page */
const Profile = () => {
  const [editable, setEditable] = useState(false)
  const { createSession } = useSession()
  const { formatTimestamp } = useDateTime()
  const { showNotification } = useNotification()
  const [inputStatus] = useState<InputStatus>()
  const user = useSelector((state: RootState) => state.userSlice.value)

  const fieldMode = editable ? 'editableDiv' : 'nonEditableDiv'
  const createDate = formatTimestamp(user.createDateUtc)
  const updateDate = formatTimestamp(user.updateDateUtc)

  /** Triggered on form submit */
  const onSubmit = async (ev: UserProfile) => {
    ev.preventDefault()

    const firstName = ev.target.firstName.value
    const lastName = ev.target.lastName.value
    const gender = ev.target.gender.value
    const phone = ev.target.phone.value
    const email = ev.target.email.value
    const password = ev.target.password.value

    const updatedUser = {
      firstName,
      lastName,
      gender,
      phone,
      email,
      password,
    }

    // This is where you can put the validation of inputs
    // setInputStatus({ email: null, password: 'error' })
    try {
      const req = await api.updateUser({ body: updatedUser })
      const data: APIUser = JSON.parse(req)

      if (data.status === 'success') {
        createSession(data.user)
        setEditable(false)
        showNotification({
          title: 'Success',
          content: 'Data successfully saved',
        })
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
    <div css={styles.block}>
      <div css={styles.sidebar}>
        <h1>User info</h1>

        <UI.Button
          onClick={() => setEditable(true)}
          css={styles.editProfile}
          disabled={editable}
        >
          Edit details
        </UI.Button>

        <NavLink to={Routes.Logs}>Editing logs</NavLink>
      </div>

      <form onSubmit={onSubmit}>
        <div css={styles.field}>
          <label htmlFor='firstName'>First Name</label>
          <UI.Input
            id='firstName'
            mode={fieldMode}
            css={styles.fieldInput}
            defaultValue={user.firstName}
          />
        </div>

        <div css={styles.field}>
          <label htmlFor='lastName'>Last Name</label>
          <UI.Input
            id='lastName'
            mode={fieldMode}
            css={styles.fieldInput}
            defaultValue={user.lastName}
          />
        </div>

        <div css={styles.field}>
          <label htmlFor='gender'>Gender</label>
          <UI.Input
            id='gender'
            mode={fieldMode}
            css={styles.fieldInput}
            defaultValue={user.gender}
          />
        </div>

        <div css={styles.field}>
          <label htmlFor='phone'>Phone</label>
          <UI.Input
            id='phone'
            mode={fieldMode}
            css={styles.fieldInput}
            defaultValue={user.phone}
          />
        </div>

        <div css={styles.field}>
          <label htmlFor='password'>
            <UI.RequiredTag>Password</UI.RequiredTag>
          </label>

          <UI.Input
            type='password'
            id='password'
            mode={fieldMode}
            css={styles.fieldInput}
            status={inputStatus?.password}
            aria-required='true'
          />
        </div>

        <div css={styles.field}>
          <label htmlFor='email'>Email</label>

          <UI.Input
            type='email'
            id='email'
            mode='nonEditableDiv'
            css={styles.fieldInput}
            defaultValue={user.email}
            status={inputStatus?.email}
            autoComplete='off'
            aria-required='true'
          />
        </div>

        <div css={styles.field}>
          <label htmlFor='createDate'>Create date</label>
          <UI.Input
            id='createDate'
            mode='nonEditableDiv'
            css={styles.fieldInput}
            defaultValue={createDate}
          />
        </div>

        <div css={styles.field}>
          <label htmlFor='updateDate'>Update date</label>
          <UI.Input
            id='updateDate'
            mode='nonEditableDiv'
            css={styles.fieldInput}
            defaultValue={updateDate}
          />
        </div>

        <div css={styles.controls}>
          <UI.Button
            disabled={!editable}
            onClick={() => setEditable(false)}
          >
            Cancel
          </UI.Button>

          <UI.Button disabled={!editable}>Submit</UI.Button>
        </div>
      </form>
    </div>
  )
}

const styles = {
  block: css`
    width: 80%;
    margin: auto;
    padding: 0 40px 40px 40px;
    min-height: 350px;
    display: flex;
  `,

  sidebar: css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-right: 30px;
  `,

  field: css`
    width: 100%;
    display: flex;

    label {
      width: 100px;
      display: flex;
      justify-content: flex-end;
      align-items: flex-end;
    }
  `,

  fieldInput: css`
    margin-left: 20px;
  `,

  controls: css`
    display: flex;
    justify-content: end;
    margin-top: 20px;

    & > *:first-child {
      margin-right: 10px;
    }
  `,

  editProfile: css`
    margin: 20px 0;
  `,
}

export default Profile
export { Profile }

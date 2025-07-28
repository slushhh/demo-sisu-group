import type { User, SisuDB, Log } from '@/types'

// Here we emulate server-side operations

/** Database */
export const getDBData = () => {
  const initDB: SisuDB = { logs: {}, users: {} }
  const db = localStorage.getItem('sisuDB') || JSON.stringify(initDB)
  const dbData: SisuDB = JSON.parse(db)

  return dbData
}

/**
 * Guard, verifies that the minimum required
 * data is available when requested from the client
 */
const isRequiredData = (user: User) => {
  if (!user.email || !user.password) {
    return JSON.stringify({
      status: 'error',
      message: 'Request error. The required data is missing',
    })
  }
}

/**
 * Creating a user. Returns the created
 * user or an error if the user already exists
 */
export const apiCreateUser = async (user: string) => {
  const newUser: User = JSON.parse(user)
  const dbData = getDBData()

  const checkReqData = isRequiredData(newUser)
  if (checkReqData) return checkReqData

  const apiNewUser: User = {
    email: newUser.email,
    password: newUser.password,
    firstName: '',
    lastName: '',
    gender: '',
    phone: '',
    createDateUtc: Date.now(),
    updateDateUtc: null,
  }

  const apiUser = { ...apiNewUser }
  delete apiUser.password

  if (!Reflect.has(dbData.users, newUser.email)) {
    const entry: SisuDB = {
      ...getDBData(),
      users: { ...getDBData().users, [newUser.email]: apiNewUser },
    }

    localStorage.setItem('sisuDB', JSON.stringify(entry))

    return JSON.stringify({
      status: 'success',
      message: 'User successfully created',
      user: apiUser,
    })
  }

  return JSON.stringify({
    status: 'error',
    message: 'Unable to create user. A user with this email already exists',
  })
}

/** Returns the user or an error if no user is found */
export const apiGetUser = async (email: string) => {
  const dbData = getDBData()

  if (Reflect.has(dbData.users, email)) {
    const user: User = { ...dbData.users[email] }
    delete user.password

    return JSON.stringify({
      status: 'success',
      message: 'User found',
      user,
    })
  }

  return JSON.stringify({
    status: 'error',
    message: 'User not found',
  })
}

/**
 * Updates user data. Also here we have a
 * routine for saving logs about changes in
 * user data
 */
export const apiUpdateUser = async (user: string) => {
  const dbData = getDBData()
  const clientUser: User = JSON.parse(user)
  const userId = clientUser.email

  const checkReqData = isRequiredData(clientUser)
  if (checkReqData) return checkReqData

  if (Reflect.has(dbData.users, userId)) {
    const storedUser = dbData.users[userId]
    const updatedUser: User = {
      ...clientUser,
      updateDateUtc: Date.now(),
      createDateUtc: storedUser.createDateUtc,
    }

    const suKeys = Object.keys(storedUser)
    const uuKeys = Object.keys(updatedUser)
    const isSameKeys = suKeys.every(k => uuKeys.includes(k))

    // Routine for saving logs about
    // changes in user data
    if (isSameKeys) {
      const timestamp = Date.now()
      const entry = {} as Log
      let deltaEntry

      Object.entries(storedUser).forEach(entries => {
        const [key, value] = entries as [keyof User, string]
        if (key === 'updateDateUtc') return

        if (updatedUser[key as keyof User] !== value) {
          entry[timestamp] = [
            ...((timestamp in entry && entry[timestamp]) || []),
            {
              key,
              oldValue: value,
              newValue: updatedUser[key as keyof User] as string,
            },
          ]
        }
      })

      if (userId in dbData.logs) {
        const logsUser = [...dbData.logs[userId], entry]

        deltaEntry = { ...getDBData().logs, [userId]: logsUser }
      } else {
        deltaEntry = { ...getDBData().logs, [userId]: [entry] }
      }

      localStorage.setItem(
        'sisuDB',
        JSON.stringify({ ...getDBData(), logs: deltaEntry }),
      )
    }

    // Updating user data
    const entry: SisuDB = {
      ...getDBData(),
      users: { ...getDBData().users, [userId]: updatedUser },
    }

    localStorage.setItem('sisuDB', JSON.stringify(entry))
    delete updatedUser.password

    return JSON.stringify({
      status: 'success',
      message: 'User data successfully updated',
      user: updatedUser,
    })
  }

  return JSON.stringify({
    status: 'error',
    message: 'User not found',
  })
}

/**
 * User login. Returns the logged in user
 * or an error if the email or password is invalid
 */
export const apiLoginUser = async (user: string) => {
  const userData: User = JSON.parse(user)
  const dbData = getDBData()

  const checkReqData = isRequiredData(userData)
  if (checkReqData) return checkReqData

  if (dbData.users[userData.email]?.password === userData.password) {
    const dbUser = dbData.users[userData.email]
    delete dbUser.password

    return JSON.stringify({
      status: 'success',
      message: 'User successfully authorized',
      user: dbUser,
    })
  }

  return JSON.stringify({
    status: 'error',
    message: 'Authorization error. Email or password is not correct',
  })
}

/**
 * Retrieves logs of changes to user data.
 * Returns an error if the user is not found
 */
export const apiGetLogs = async (email: string) => {
  const dbData = getDBData()

  if (Reflect.has(dbData.logs, email)) {
    const logs = dbData.logs[email]

    return JSON.stringify({
      status: 'success',
      message: 'Logs found',
      logs,
    })
  }

  return JSON.stringify({
    status: 'error',
    message: 'User not found',
  })
}

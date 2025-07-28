/** User data structure */
export type User = {
  email: string
  password?: string
  firstName: string
  lastName: string
  gender: string
  phone: string
  createDateUtc: number
  updateDateUtc: number | null
}

/** Log data structure */
export type Log = {
  [timestamp: number]: Array<{
    key: keyof User
    oldValue: string
    newValue: string
  }>
}

/** Database structure */
export type SisuDB = {
  users: APIDBUsers
  logs: APIDBLogs
}

export type APIDBUsers = {
  [email: string]: User
}

export type APIDBLogs = {
  [email: string]: Array<Log>
}

/** Structure of server response */
export type APIResponse = {
  status: 'success' | 'error'
  message: string
}

export type APIUser = APIResponse & {
  user: User
}

export type APILogs = APIResponse & {
  logs: Array<Log>
}

/**
 * Route error data structure
 */
export type RouteError = {
  /** Error code */
  status: number

  /** Status text */
  statusText: string

  /** Error message */
  message: string
}

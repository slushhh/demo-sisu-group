import * as backend from '@/services/backend-actions'

type RequestOptions = {
  body?: BodyInit | object | null | undefined
  method?: RequestInit['method']
  headers?: HeadersInit | undefined
}

/**
 * Emulation of API request to the server
 */
const Request = (url: string, options: RequestOptions): Promise<string> => {
  let { body } = options
  const { method } = options
  const headers = { ...options.headers } as Record<string, never>

  let reqResult: Promise<string>

  if (method === 'POST' && url === 'user') {
    body = JSON.stringify(body)
    reqResult = backend.apiCreateUser(body)
  } else if (method === 'GET' && url === 'user') {
    reqResult = backend.apiGetUser(headers.userId)
  } else if (method === 'PUT' && url === 'user') {
    body = JSON.stringify(body)
    reqResult = backend.apiUpdateUser(body)
  } else if (method === 'POST' && url === 'auth') {
    body = JSON.stringify(body)
    reqResult = backend.apiLoginUser(body)
  } else if (method === 'GET' && url === 'logs') {
    body = JSON.stringify(body)
    reqResult = backend.apiGetLogs(headers.userId)
  }

  // Here we emulate a random network delay
  // of up to two seconds to approximate real
  // conditions
  return new Promise(res => {
    setTimeout(
      () => {
        res(reqResult)
      },
      Math.round(Math.random() * 2000),
    )
  })
}

/** Creates a user */
export const createUser = async (options: RequestOptions): Promise<string> => {
  const { body } = options

  return await Request('user', { body, method: 'POST' })
}

/** Gets the user */
export const getUser = async (options: RequestOptions): Promise<string> => {
  const { headers } = options

  return await Request('user', { headers, method: 'GET' })
}

/** Updates the user */
export const updateUser = async (options: RequestOptions): Promise<string> => {
  const { body } = options

  return await Request('user', { body, method: 'PUT' })
}

/** Logins the user */
export const loginUser = async (options: RequestOptions): Promise<string> => {
  const { body } = options

  return await Request('auth', { body, method: 'POST' })
}

/** Receives logs of changes to user data */
export const getLogs = async (options: RequestOptions): Promise<string> => {
  const { headers } = options

  return await Request('logs', { headers, method: 'GET' })
}

import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { css } from 'styled-components'

import { useDateTime } from '@/hooks'

import * as UI from '@/components/ui'
import * as api from '@/services/api'

import { Routes } from '@/data'

import type { RootState } from '@/store'
import type { APILogs, Log } from '@/types'

/** User data change logs display page */
const Logs = () => {
  const navigate = useNavigate()
  const { formatTimestamp } = useDateTime()
  const [logs, setLogs] = useState<Array<Log>>()
  const user = useSelector((state: RootState) => state.userSlice.value)

  useEffect(() => {
    ;(async () => {
      try {
        const req = await api.getLogs({
          headers: { userId: user.email },
        })

        const data: APILogs = JSON.parse(req)

        if (data.status === 'success') setLogs(data.logs)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])

  return (
    <div css={styles.block}>
      <div css={styles.sidebar}>
        <h1>Logs</h1>

        <UI.Button
          onClick={() => navigate(Routes.Profile)}
          css={styles.backToProfile}
        >
          Back
        </UI.Button>
      </div>

      <div css={styles.logs}>
        <div css={styles.header}>Entries</div>
        {logs?.map(log => {
          const timestamp = +Object.keys(log)[0]
          const fields = log[timestamp]
          const key = timestamp || Math.ceil(Math.random() * 10000000000)

          return (
            <div
              css={styles.entry}
              key={key}
            >
              <div css={styles.entryHeader}>{formatTimestamp(timestamp)}</div>
              <div css={styles.entryFields}>
                {fields?.map(field => {
                  const { key, oldValue, newValue } = field

                  return (
                    <div key={key}>
                      {key}: {oldValue ? oldValue : '""'} &rarr; {newValue}
                    </div>
                  )
                })}
              </div>
            </div>
          )
        }) || <div css={styles.loadingStatus}>Loading...</div>}
      </div>
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

  logs: css`
    margin-top: 5px;
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color: #ffffff;
    border: max(1px, 0.0625rem) solid #d0d7de;
    border-radius: 4px;
  `,

  header: css`
    background-color: #f6f8fa;
    border-width: 1px;
    border-color: #d0d7de;
    border-style: solid;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    margin: -1px;
    padding: 10px;
  `,

  loadingStatus: css`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  `,

  entry: css`
    border-top: 1px solid hsla(210, 18%, 87%, 1);
    list-style-type: none;
    padding: 15px;
  `,

  entryHeader: css`
    font-weight: 600;
    font-size: 15px;
  `,

  entryFields: css`
    margin-top: 10px;
    font-size: 14px;
  `,

  backToProfile: css`
    margin: 20px 0;
  `,
}

export default Logs
export { Logs }

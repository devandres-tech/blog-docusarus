import React from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

import styles from './styles.module.css'

const email = () => {
  const [emailCopied, setEmailCopied] = React.useState(false)
  return (
    <div>
      <CopyToClipboard
        text='devandres.tech@gmail.com'
        onCopy={() => {
          setEmailCopied(true)
          setTimeout(() => {
            setEmailCopied(false)
          }, 2000)
        }}
      >
        <span styles={styles.emailSvg}>
          <FontAwesomeIcon
            className={styles.emailSvg}
            alt={'email'}
            title={'email'}
            icon={faEnvelope}
            size='2x'
          />
        </span>
      </CopyToClipboard>
      {emailCopied && (
        <span className={styles.alert}>
          <b>Email copied to clipboard!</b>
        </span>
      )}
    </div>
  )
}

export default email

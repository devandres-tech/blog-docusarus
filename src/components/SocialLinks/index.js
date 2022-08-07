import React from 'react'
import { dom } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faGithub,
  faLinkedinIn,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import CopyToClipboard from 'react-copy-to-clipboard'

import styles from './styles.module.css'

const socialLinks = [
  {
    faIcon: faTwitter,
    alt: 'twitter',
    url: 'https://twitter.com/devandres_tech',
  },
  {
    faIcon: faGithub,
    alt: 'GitHub',
    url: 'https://github.com/devandres-tech',
  },
  {
    faIcon: faLinkedinIn,
    alt: 'Linkedin',
    url: 'https://www.linkedin.com/in/andres-io/',
  },
  {
    faIcon: faEnvelope,
    alt: 'email',
    url: '#',
  },
]

function SocialLink({ faIcon, alt, url, setEmailCopied }) {
  let icon
  if (faIcon === faEnvelope) {
    icon = (
      <CopyToClipboard
        text='devandres.tech@gmail.com'
        onCopy={() => {
          setEmailCopied(true)
          setTimeout(() => {
            setEmailCopied(false)
          }, 2000)
        }}
      >
        <div>
          <a href='javascript:void(0)'>
            <FontAwesomeIcon alt={alt} title={alt} icon={faIcon} size='2x' />
          </a>
        </div>
      </CopyToClipboard>
    )
  } else {
    icon = (
      <div>
        <a href={url}>
          <FontAwesomeIcon alt={alt} title={alt} icon={faIcon} size='2x' />
        </a>
      </div>
    )
  }

  return icon
}

function SocialLinks() {
  const [emailCopied, setEmailCopied] = React.useState(false)

  return (
    <div className={styles.socialLinksContainer}>
      <div className={styles.socialLinks}>
        <style type='text/css'>{dom.css()}</style>
        {socialLinks.map((props, idx) => (
          <SocialLink setEmailCopied={setEmailCopied} key={idx} {...props} />
        ))}
      </div>
      {emailCopied && (
        <span>
          <b>Email copied to clipboard!</b>
        </span>
      )}
    </div>
  )
}

export default SocialLinks

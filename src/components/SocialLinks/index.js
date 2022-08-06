import React from 'react'
import { dom } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faGithub,
  faLinkedinIn,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

import styles from './styles.module.css'

const socialLinks = [
  {
    faIcon: faLinkedinIn,
    alt: 'Linkedin',
    url: 'https://www.linkedin.com/in/andres-io/',
  },
  {
    faIcon: faGithub,
    alt: 'GitHub',
    url: 'https://github.com/devandres-tech',
  },
  {
    faIcon: faTwitter,
    alt: 'Padlet',
    url: 'https://twitter.com/devandres_tech',
  },
  {
    faIcon: faEnvelope,
    alt: 'Padlet',
    url: 'https://padlet.com/about/us/wish/1072760846',
  },
]

function SocialLink({ faIcon, alt, url }) {
  return (
    <div>
      <a href={url}>
        <FontAwesomeIcon alt={alt} title={alt} icon={faIcon} size='2x' />
      </a>
    </div>
  )
}

function SocialLinks() {
  return (
    <div className={styles.socialLinks}>
      <style type='text/css'>{dom.css()}</style>
      {socialLinks.map((props, idx) => (
        <SocialLink key={idx} {...props} />
      ))}
    </div>
  )
}

export default SocialLinks

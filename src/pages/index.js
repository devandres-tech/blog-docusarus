import React from 'react'
import clsx from 'clsx'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'

import SocialLinks from '../components/SocialLinks'
import styles from './index.module.css'

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext()
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div style={{ maxWidth: '34rem' }}>
        <p className='hero__subtitle'>Hello! my name is</p>
        <h1 className='hero__title'>
          <span style={{ color: 'rgb(4, 186, 52)' }}>{`{ `}</span>
          {siteConfig.title}
          <span style={{ color: '#9438ed' }}>{` }`}</span>
        </h1>
        <p className='hero__subtitle'>{siteConfig.tagline}</p>
        <SocialLinks />
      </div>
    </header>
  )
}

export default function Home() {
  return (
    <Layout
      title={`Software Developer`}
      description='Andres Alcocer | Blog | React Frontend Developer'
    >
      <HomepageHeader />
    </Layout>
  )
}

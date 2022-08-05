import React from 'react'
import clsx from 'clsx'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'

import styles from './index.module.css'

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext()
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div style={{ maxWidth: '30rem' }}>
        <p className='hero__subtitle'>Hello! my name is</p>
        <h1 className='hero__title'>
          <span style={{ color: 'rgb(4, 186, 52)' }}>{`{ `}</span>
          {siteConfig.title}
          <span style={{ color: '#850dff' }}>{` }`}</span>
        </h1>
        <p className='hero__subtitle'>{siteConfig.tagline}</p>
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

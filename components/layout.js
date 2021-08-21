// Standard Next.js Import
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

// Stylesheets
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'

// Default BG color
import config from '../config.json'

// Import Images
import logo from '../public/images/logo100x100.png'

export const siteTitle = 'AZUIR'

const BodyStyle = ({ background }) => {
  return (
    <style jsx global>{`
      body {
        color: ${config.body.default_color};
        ${(background !== undefined) ? background : `background-color: ${config.body.default_background_color};`}
      }
    `}</style>
  )
}

const Layout = ({ children, home, background }) => {
  return (
    <>
      <BodyStyle background={background}/>
      <div className={styles.container}>
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="description"
            content="Personal Portfolio Website Azuir.net"
          />
          <meta name="og:title" content={siteTitle} />
          <link href="https://fonts.googleapis.com/css?family=Megrim&display=swap" rel="stylesheet" />
        </Head>
        
        <header className={styles.header}>
          {!home && (
            <Link href="/">
              <div className={styles.backToHome}>
                <span>BACK</span>
              </div>
            </Link>
          )}
        </header>
        <main>{children}</main>
        <footer className={styles.footer}>
          {home && (
            <p>links here</p>
          )}
        </footer>
      </div>
    </>
  )
}

export default Layout
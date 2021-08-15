// Standard Next.js Import
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

// Stylesheets
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'

export const siteTitle = 'AZUIR'

const Layout = ({ children, home }) => {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Personal Portfolio Website Azuir.net"
        />
        <meta name="og:title" content={siteTitle} />
      </Head>
      
      <header className={styles.header}>
      </header>
      <main>{children}</main>

      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
    </div>
  )
}

export default Layout
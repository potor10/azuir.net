// Standard Next.js Import
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

// Stylesheets
import utilStyles from '../styles/utils.module.css'

// Library
import { sortTracks, getTracks } from '../lib/tracks'

// Components
import Layout, { siteTitle } from '../components/layout'
import Background from '../components/background'



// Obtain Static Props 
export async function getStaticProps() {
  const tracksData = await getTracks()
  const sortedTracks = sortTracks(tracksData)
  return {
    props: {
      sortedTracks
    }
  }
}

const Home = ({ sortedTracks }) => {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <Background>
        <p style={{ position: "absolute"}}>
          I'm cool
        </p>
      </Background>
      <ul className={utilStyles.list}>
        {sortedTracks.map(({ id, title, artwork_url, user, playback_count, likes_count }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/tracks/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <Image
                priority
                src={user.avatar_url}
                className={utilStyles.borderCircle}
                height={144}
                width={144}
              />
              <p>{playback_count} ▷ {likes_count} ♡ {user.avatar_url}</p>
            </li>
          ))}
      </ul>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>About</h2>
      </section>
    </Layout>
  )
}

export default Home
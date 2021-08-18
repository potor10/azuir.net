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
import ListElement from '../components/list_element'
import Waves from '../components/waves'
import Particles from '../components/particles'

// Parallax Scrolling For Components
import { Parallax } from 'react-scroll-parallax';

// Import Images
import logo from '../public/images/logo.png'

// Obtain Static Props 
export async function getStaticProps() {
  const tracksData = await getTracks()
  return {
    props: {
      tracksData
    }
  }
}

const Home = ({ tracksData }) => {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <Background>
        <div className={utilStyles.character} />
        <div className={utilStyles.main}>
          <Image src={logo} alt={'azuir logo'} width={"100px"} height={"100px"}/>
          <h1 className={utilStyles.name}>ZUIR</h1>
        </div>
      </Background>
      <Waves />
      <Particles />
      <Parallax y={[0, -300]}>
        <div className={utilStyles.tracklist}>
          <h2>Tracks</h2>
          <ul>
            {tracksData.map((trackData, index) => (
              <ListElement key={trackData.id} trackData={trackData} index={index}/>
            ))}
          </ul>
        </div>
      </Parallax>

      <section className={`${utilStyles.end}`}>
        <h2>About</h2>
      </section>
    </Layout>
  )
}

export default Home
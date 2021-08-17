// Standard Next.js Import
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

// Stylesheets
import utilStyles from '../../styles/utils.module.css'

// Library
import { getTracks, getTrack } from '../../lib/tracks'

// Components
import Layout from '../../components/layout'

export async function getStaticProps({ params }) {
  const trackData = await getTrack(params.id)
  return {
    props: {
      trackData
    }
  }
}

export async function getStaticPaths() {
  const tracks = await getTracks()

  const paths = tracks.map((song) => {
    return {
      params: {
        id: `${song.id}`
      }
    }
  })

  return {
    paths,
    fallback: false
  }
}

const Track = ({ trackData }) => {
  return (
    <Layout>
      <Head>
        <title>{trackData.title}</title>
      </Head>
      <article>
        <h1>{trackData.title}</h1>
        <p>{JSON.stringify(trackData)}</p>
      </article>
      <Image 
        priority
        src={(trackData.artwork_url !== null) ? 
          (trackData.artwork_url) : (trackData.user.avatar_url)}
        alt={trackData.title}
        height={300}
        width={300}
      />
    </Layout>
  )
}

export default Track
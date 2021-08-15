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
        <h1 className={utilStyles.headingXl}>{trackData.title}</h1>
        <p>{JSON.stringify(trackData)}</p>
      </article>
    </Layout>
  )
}

export default Track
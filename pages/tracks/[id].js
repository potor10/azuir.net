// Standard Next.js Import
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

// Stylesheets
import trackStyles from '../../styles/track.module.css'

// Library
import { getTracks, getTrack, getWaveform } from '../../lib/tracks'
import { getVibrant } from '../../lib/vibrant'

// Components
import Layout from '../../components/layout'

export async function getStaticProps({ params }) {
  const trackData = await getTrack(params.id)
  const waveformData = await getWaveform(trackData.waveform_url)
  const vibrantData = await getVibrant((trackData.artwork_url !== null) ? 
    (trackData.artwork_url) : (trackData.user.avatar_url))

  let vibrantColors = { 
    vibrant: vibrantData.Vibrant.getHex(),
    darkVibrant: vibrantData.DarkVibrant.getHex(),
    lightVibrant: vibrantData.LightVibrant.getHex(),
    muted: vibrantData.Muted.getHex(),
    darkMuted: vibrantData.DarkMuted.getHex(),
    lightMuted: vibrantData.LightMuted.getHex(),
  }

  return {
    props: {
      trackData,
      waveformData,
      vibrantColors
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

const Waveform = ({ waveformData }) => {
  let waveform = 'M0 0'

  let totalChunk = 0
  let chunkSize = 10
  waveformData.samples.forEach((sample, index) => {
    totalChunk += sample
    if (index % chunkSize === 0) { 
      waveform += ` L ${index} ${totalChunk/chunkSize}`
      totalChunk = 0
    }
  })
  waveform += `L ${waveformData.width} 0`


  return(
    <svg viewBox={`0 0 ${waveformData.width} ${waveformData.height}`} className={trackStyles.waveform} preserveAspectRatio={"none"}>
      <defs>
        <linearGradient id="waveGradient" gradientTransform="rotate(90)">
          <stop offset="0%"  stopColor="#fff" stopOpacity="1" />
          <stop offset="40%" stopColor="#fff" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <g transform={"scale(1,-1)"} >
        <path transform={`translate(0, -${waveformData.height})`} d={waveform} fill={"url(#waveGradient)"} />
      </g>
    </svg>
  )
}

const TrackBackground = ({ trackData, vibrantColors }) => {
  return (
    <>
      <style jsx>{`
        div {
          background-color: ${vibrantColors.lightMuted};
        }
      `}</style>
      <div className={trackStyles.background}>
      </div>
    </>
  )
}

const Track = ({ trackData, waveformData, vibrantColors }) => {
  // Format the date display
  const dateFormat = { year: 'numeric', month: 'long', day: 'numeric' }
  let dateStr = new Date(Date.parse(trackData.created_at)).toLocaleDateString('en', dateFormat)

  let trackDuration = trackData.duration

  const hours = Math.floor(trackDuration / 3600000)
  trackDuration -= (hours * 3600000)

  const minutes = Math.floor(trackDuration / 60000)
  trackDuration -= (minutes * 60000)

  const seconds = (Math.floor(trackDuration / 1000) < 10) ? 
    `0${Math.floor(trackDuration / 1000)}` : Math.floor(trackDuration / 1000)

  const splitRegex = /"[^"]+"|[^\s]+/g
  let tags = trackData.tag_list.match(splitRegex)
  
  if (tags !== null) {
    tags = tags.map(tag => tag.replace(/"(.+)"/, "$1"));
  } else {
    tags = []
  }

  return (
    <Layout>
      <Head>
        <title>{trackData.title}</title>
      </Head>
      <Waveform waveformData={waveformData} />
      <TrackBackground trackData={trackData} vibrantColors={vibrantColors} />
      <div className={trackStyles.trackContainer}>
        <div className={trackStyles.artwork}>
          <Image 
            priority
            src={(trackData.artwork_url !== null) ? 
              (trackData.artwork_url) : (trackData.user.avatar_url)}
            alt={trackData.title}
            height={300}
            width={300}
          />
        </div>
        <div className={trackStyles.infoWrapper}>
          <table className={trackStyles.trackDetails}>
            <tbody>
              <tr>
                <td>Title</td>
                <td>{trackData.title}</td>
              </tr>
              <tr>
                <td>Published</td>
                <td>{dateStr}</td>
              </tr>
              <tr>
                <td>Track Length</td>
                <td>{(hours > 0) ? (`${hours}:`) : ('')}{minutes}:{seconds}</td>
              </tr>
              <tr>
                <td>Genre</td>
                <td>{(trackData.genre.length > 0) ? trackData.genre : "N/A"}</td>
              </tr>
            </tbody>
          </table>
          <div className={trackStyles.soundcloudBox}>
            <iframe width={"100%"} height={"150px"} scrolling={"no"} frameBorder={"no"} allow={"autoplay"} 
              src={`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${trackData.id}` + 
                `&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true`}/>
            <div className={trackStyles.artistInfo}>
              <a href={trackData.user.permalink_url} title={trackData.user.username} target={"_blank"} className={trackStyles.artistLink}>
                {trackData.user.username}
              </a>
              <span>·</span>
              <a href={trackData.permalink_url} title={trackData.title} target={"_blank"} className={trackStyles.artistLink}>
                {trackData.title}
              </a>
            </div>
          </div>
          <div className={trackStyles.tagList}>
            <style jsx>{`
              span {
                color: ${vibrantColors.vibrant};
                background-color: ${vibrantColors.darkMuted}
              }
            `}</style>
            {tags.map((tag, index) => (
              <span key={index} className={trackStyles.tag}>#{tag}</span>
            ))}
          </div>
          <div>
            <p>{trackData.description}</p>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Track
// Standard Next.js Import
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

// Stylesheets
import trackStyles from '../../styles/track.module.css'

// React Imports
import * as React from 'react'

// Library
import { getTracks, getTrack, getWaveform } from '../../lib/tracks'
import { getVibrant } from '../../lib/vibrant'
import { lighten } from '../../lib/lighten'

// Components
import Layout from '../../components/layout'
import Background from '../../components/track_background'

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

const Waveform = ({ waveformData, vibrantColors }) => {
  let waveform = 'M0 0'

  let totalChunk = 0
  let chunkSize = 2
  let repeat = 2
  let lastValue = 0

  for (let i = 0; i < repeat; i++) {
    waveformData.samples.forEach((sample, index) => {
      totalChunk += sample
      if (index % chunkSize === 0) { 
        // Maximum value to accomodate for slope
        let max = Math.min(lastValue + chunkSize * Math.sin(45), 
          (waveformData.width - index) * Math.sin(45))

        // Minimum value to accomodate for slope
        let min = lastValue - chunkSize * Math.sin(45)

        let nextPoint = (totalChunk/chunkSize > max) ? max : 
          ((totalChunk/chunkSize < min) ? min : totalChunk/chunkSize)

        waveform += ` L ${index + (i * waveformData.width)} ${nextPoint}`

        lastValue = nextPoint
        totalChunk = 0
      }
    })
    waveform += `L ${waveformData.width + (i * waveformData.width)} 0`
    totalChunk = 0
  }

  let width = waveformData.width * repeat

  return(
    <div className={trackStyles.waveformContainer}>
      <svg viewBox={`0 0 ${width} ${waveformData.height * 2}`} 
        className={trackStyles.waveform} preserveAspectRatio={"none"}>
        <defs>
          <pattern id="waveLines"
            width="1" height={Math.sin(Math.PI * 0.25) * waveformData.width/40}
            patternUnits="userSpaceOnUse"
            patternTransform={`rotate(45, ${waveformData.width}, ${waveformData.height / 2})`}>
            <line stroke={vibrantColors.vibrant} strokeWidth="5px" y2="1px"/>
          </pattern>
        </defs>
        <g transform={"scale(1, 1)"} >
          <path transform={`translate(0, ${waveformData.height})`} d={waveform} fill={"url(#waveLines)"} />
          <path transform={`scale(1, -1) translate(0, -${waveformData.height})`} d={waveform} fill={"url(#waveLines)"} />
        </g>
      </svg>
    </div>
  )
}

const TrackArt = ({ vibrantColors, trackData }) => {
  return (
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
  )
}

const TrackInfo = ({ vibrantColors, trackData }) => {
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
  )
}

const Track = ({ trackData, waveformData, vibrantColors }) => {
  const background = `background-color: white;`

  return (
    <Layout background={background}>
      <Head>
        <title>{trackData.title}</title>
      </Head>
      <Background vibrantColors={vibrantColors} trackData={trackData}/>
      <Waveform waveformData={waveformData} vibrantColors={vibrantColors}/>
      <div className={trackStyles.trackContainer}>
        <TrackArt vibrantColors={vibrantColors} trackData={trackData} />
        <TrackInfo vibrantColors={vibrantColors} trackData={trackData} />
      </div>
    </Layout>
  )
}

export default Track
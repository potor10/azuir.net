// Require for GET Request
const https = require('https')

// Config
const config = require('../config.json').track

const sortTracks = (tracksData) => {
  return tracksData.sort(({ created_at: a }, { created_at: b}) => {
    if (a < b) {
      return 1
    } else if (a > b) {
      return -1
    } else {
      return 0
    }
  })
}

const updateImages = (trackData) => {
  if (trackData.artwork_url !== null) {
    let sizeIdx = trackData.artwork_url.lastIndexOf(config.old_size)
    trackData.artwork_url = trackData.artwork_url.slice(0, sizeIdx) 
      + trackData.artwork_url.slice(sizeIdx).replace(config.old_size, config.new_size)
  }

  if (trackData.user.avatar_url !== null) {
    let sizeIdx = trackData.user.avatar_url.lastIndexOf(config.old_size)
    trackData.user.avatar_url = trackData.user.avatar_url.slice(0, sizeIdx) 
      + trackData.user.avatar_url.slice(sizeIdx).replace(config.old_size, config.new_size)
  }
}

export const getTracks = () => {
  return new Promise ((resolve, reject) => {
    const api = `https://api-v2.soundcloud.com/users/${process.env.USER_ID_TEST}/tracks?&client_id=${process.env.CLIENT_ID}`
    https.get(api, (res) => {
      // console.log('statusCode:', res.statusCode)
      // console.log('headers:', res.headers)

      let json = ''

      res.on('data', (chunk) => { json += chunk })

      res.on('end', () => {
        if (res.statusCode === 200) {
          try {
            let songs = sortTracks(JSON.parse(json).collection)
            // Update songs array with new better res images
            songs.forEach(trackData => {
              updateImages(trackData)
            })
            // Songs are sent back as an array
            resolve(songs)
          } catch (err) {
            reject(err)
          }
        } else {
          reject(res.statusCode)
        }
      })

    }).on('error', (err) => {
      reject(err)
    })
  })
}

export const getTrack = (trackId) => {
  return new Promise ((resolve, reject) => {
    const api = `https://api-v2.soundcloud.com/tracks/${trackId}?&client_id=${process.env.CLIENT_ID}`
    https.get(api, (res) => {
      // console.log('statusCode:', res.statusCode)
      // console.log('headers:', res.headers)

      let json = ''

      res.on('data', (chunk) => { json += chunk })

      res.on('end', () => {
        if (res.statusCode === 200) {
          try {
            let track = JSON.parse(json)
            // Update trac with new better res images
            updateImages(track)

            // Track data is sent back
            resolve(track)
          } catch (err) {
            reject(err)
          }
        } else {
          reject(res.statusCode)
        }
      })

    }).on('error', (err) => {
      reject(err)
    })
  })
}

export const getWaveform = (url) => {
  return new Promise ((resolve, reject) => {
    https.get(url, (res) => {
      let json = ''

      res.on('data', (chunk) => { json += chunk })
      res.on('end', () => {
        if (res.statusCode === 200) {
          try {
            let waveform = JSON.parse(json)
            resolve(waveform)
          } catch (err) {
            reject(err)
          }
        } else {
          reject(res.statusCode)
        }
      })

    }).on('error', (err) => {
      reject(err)
    })
  })
}
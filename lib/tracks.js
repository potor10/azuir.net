const https = require('https')

export const sortTracks = (tracksData) => {
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
            var songs = JSON.parse(json)
            
            // Songs are sent back as an array
            resolve(songs.collection)
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
            var track = JSON.parse(json)
            
            // Songs are sent back as an array
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
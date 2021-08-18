// Require Vibrant
let Vibrant = require('node-vibrant')

export const getVibrant = (url) => {
  let artwork = new Vibrant(url)
  return new Promise ((resolve, reject) => {
    artwork.getPalette((err, palette) => {
      if (err) {
        reject(err)
      }
      resolve(palette)
    })
  })
}
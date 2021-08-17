// // Require
import ReactParticles  from 'react-particles-js'

// Stylesheets
import styles from './particles.module.css'

const Particles = () => {
  return (
    <ReactParticles 
      className={styles.particles}
      params={{
          particles: {
            number: {
              value: 400,
              density: {
                  enable: true,
                  value_area: 1000
              }
          },
          collisions: {
            enable: false
          },
          color: {
              value: '#ffe6f7'
          },
          opacity: {
              value: 0.5,
              anim: {
                  enable: true
              }
          },
          size: {
              value: 7,
              random: true,
              anim: {
                  enable: true,
                  speed: 3
              }
          },
          line_linked: {
              enable: false
          },
          move: {
              speed: 0.2
          }
        }    
      }}    
    />
  )
}

export default Particles
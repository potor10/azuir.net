// Require
import Wave from 'react-wavify'

// Stylesheets
import styles from './waves.module.css'

const Waves = () => {
  return (
    <div className={styles.waves}>
      <Wave 
        className={styles.wave1}
        fill='url(#gradient1)'
        paused={false}
        options={{
          height: 25,
          amplitude: 25,
          speed: 0.25,
          points: 5
        }}
      >
        <defs>
          <linearGradient id="gradient1" gradientTransform="rotate(90)">
            <stop offset="0%"  stopColor="#fff" stop-opacity="0" />
            <stop offset="20%" stopColor="#fff" stop-opacity="1" />
          </linearGradient>
        </defs>
      </Wave>
      <Wave 
        className={styles.wave2}
        fill='url(#gradient2)'
        paused={false}
        options={{
          height: 20,
          amplitude: 20,
          speed: 0.15,
          points: 3
        }}
      >
        <defs>
          <linearGradient id="gradient2" gradientTransform="rotate(90)">
            <stop offset="0%"  stopColor="#fff" stop-opacity="0" />
            <stop offset="30%" stopColor="#fff" stop-opacity="1" />
          </linearGradient>
        </defs>
      </Wave>
    </div>
  )
}

export default Waves
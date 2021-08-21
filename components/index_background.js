import Scene from './scene'

// Stylesheets
import styles from './index_background.module.css'

// Components
import Waves from './waves'

const Background = ({ children }) => {
  return (
    <>
      <Waves />
      <div className={styles.container}>
        <div className={styles.canvas}>
          <Scene/>
        </div>
        {children}
      </div>
    </>
  )
}

export default Background
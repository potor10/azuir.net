import Scene from './scene'

// Stylesheets
import styles from './background.module.css'

const Background = ({ children }) => {
  return (
    <>
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
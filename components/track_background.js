// Stylesheets
import styles from './track_background.module.css'

const BgTop = ({ vibrantColors }) => {
  return (
    <>
      <style jsx>{`
        div {
          position: absolute;
          top: 0;
          width: 100%;
          height: 50%;
          background: 
            repeating-linear-gradient(45deg, 
            ${vibrantColors.lightMuted} 0px, ${vibrantColors.lightMuted} 1px, 
            transparent 0px, transparent ${Math.sin(45) * 50}px);
        }
      `}</style>
      <div />
    </>
  )
}

const BgMid = ({ vibrantColors }) => {
  return (
    <>
      <style jsx>{`
        div {
          position absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 100%;
          height: 201px;
          background: 
            linear-gradient(
            90deg, transparent 98%,
            ${vibrantColors.muted} 50%,
            white),

            linear-gradient(
            0deg, transparent 98%,
            ${vibrantColors.muted} 50%,
            white
            );
          
          background-size: 50px 50px;
          background-repeat: repeat;

          background-color: white
        }
      `}</style>
      <div />
    </>
  )
}

const BgBot = ({ vibrantColors }) => {
  return (
    <>
      <style jsx>{`
        div {
          position: absolute;
          bottom: 0;
          width: 100%;
          height: 50%;
          background: 
            repeating-linear-gradient(45deg, 
            ${vibrantColors.lightMuted} 0px, ${vibrantColors.lightMuted} 1px, 
            transparent 0px, transparent ${Math.sin(45) * 50}px);
        }
      `}</style>
      <div />
    </>
  )
}

const Background = ({ vibrantColors, trackData }) => {
  return (
    <div className={styles.background}>
      <BgTop vibrantColors={vibrantColors} />
      <BgBot vibrantColors={vibrantColors} />
      <BgMid vibrantColors={vibrantColors} />
      <style jsx>{`
        h1 {
          text-shadow: 1px 1px 2px ${vibrantColors.lightMuted};
          filter: drop-shadow(8px 8px 0 ${vibrantColors.darkMuted});
        }
      `}</style>
      <h1 className={styles.scroller}>&#60;&#60;&#60;</h1>
    </div>
  )
}

export default Background

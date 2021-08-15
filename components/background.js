import Scene from './scene'

const Background = ({ children }) => {
  return (
    <>
      <div style={{ position: "relative", width: 1000, height: 200 }}>
        {children}
        <Scene/>
      </div>
    </>
  )
}

export default Background
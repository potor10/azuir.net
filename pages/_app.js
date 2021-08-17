import '../styles/global.css'

import { ParallaxProvider } from 'react-scroll-parallax';

const App = ({ Component, pageProps }) => {
  return (
    <ParallaxProvider>
      <Component {...pageProps} />
    </ParallaxProvider>
  )
}

export default App
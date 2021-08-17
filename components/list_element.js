// Standard Next.js Import
import Image from 'next/image'
import Link from 'next/link'

// Stylesheets
import styles from './list_element.module.css'

const ListElement = ({ trackData, index }) => {
  // Calculate offset for slightly different borders
  let offset = Math.sin(index) * 5

  // Format the tracklist numerical string
  let indexStr = index
  if (index < 10) {
    indexStr = `0${index}`
  } else if (index > 99) {
    indexStr = 99
  }

  // Format the date display
  const dateFormat = { year: 'numeric', month: 'long', day: 'numeric' }
  let dateStr = new Date(Date.parse(trackData.created_at)).toLocaleDateString('en', dateFormat)

  return (
    <>
      <style jsx>{`
        li {
          border-radius: ${240 + offset}px ${35 + offset}px ${100 + offset}px ${70 + offset}px 
            / ${35 + offset}px ${200 + offset}px ${70 + offset}px ${185 + offset}px;
        }
      `}</style>
      <Link href={`/tracks/${trackData.id}`}>
        <li className={styles.trackInfo}>
          <span className={styles.floatLeft}>{indexStr}</span>
          <span className={styles.floatLeft}>{trackData.title}</span>
          <span className={styles.floatRight}>{dateStr}</span>
        </li>
      </Link>
    </>
  )
}

export default ListElement


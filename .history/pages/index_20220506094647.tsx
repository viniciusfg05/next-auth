import type { NextPage } from 'next'
import { useState } from 'react'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')

  return (
    <div className={styles.container}>
      <input type="email" value={email} onChange={e.target.value} />
      <input type="password" value={password} onChange={e.target.value} />
    </div>
  )
}

export default Home
import Image from 'next/image'
import { Roboto } from 'next/font/google'
import UserRegistration from './user-registration'

const roboto = Roboto({
  weight: ['100','300','400','500','700','900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
})

export default function Home() {
  return (
    <main className={`${roboto.className}`}>
      <UserRegistration/>
    </main>
  )
}

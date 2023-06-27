
import Link from 'next/link';
import './global.css';
import xamkflix from '../public/xamkflix.png';
import Image from 'next/image';
import Genrelistaus from '@/components/Genrelistaus';
import DarkMode from '@/components/DarkMode';
import { Providers } from './providers';
import { LayoutProvider } from './layoutProvider';
import KayttajaValikko from '@/components/KayttajaValikko';

interface Props {
  children : React.ReactNode
}


export default async function RootLayout({children}: Props) {

  return (
    <html suppressHydrationWarning>
      
      <head/>
      
    
      <body className='font-Dosis bg-rose-100 dark:bg-slate-800'>
        
        <LayoutProvider>
        <Providers>
          <div className='p-7 flex justify-center bg-rose-400 dark:bg-slate-600'>
                  <Link href={'/'}>
                    <Image src={xamkflix} alt="xamkflix"/>
                  </Link>
                  
          </div>
                <DarkMode/>
                <KayttajaValikko/>
                <Genrelistaus children={children}/>
          
                </Providers>
          </LayoutProvider>
        
      </body>
    </html>
  )
}

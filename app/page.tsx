
import { Elokuva, haeElokuvat } from '@/lib/elokuvarekisteri';
import Karuselli from '@/components/Karuselli';
import Elokuvakortti from '@/components/Elokuvakortti';
import Nappi from '@/components/Nappi';

interface Props {
    searchParams?: {
        search?: string
    }
}

export default async function HomePage({searchParams} : Props) {

    const elokuvat : Elokuva[] = await haeElokuvat();

    const jarjesta = (a : Elokuva,b : Elokuva) => {
        if (searchParams) {
            if (searchParams.search == "3") {
                return -1;
            } else if (searchParams.search == "1"){
                if (a.nimi < b.nimi) {
                    return -1
                }
            } else if (searchParams.search == "2") {
                if (a.nimi > b.nimi) {
                    return -1
                }
                
            } else {
                return 0
            }
        } else {
            return 0
        }

        
    }

    return (
        <div className='space-y-4 '>
            
            <div className='flex justify-center'>
                <Karuselli/>
            </div>
            

            <div className='flex justify-center text-slate-100'>
                <h4 className='text-xl self-center text-rose-800 dark:text-slate-100'>Järjestä:</h4>
                <Nappi teksti='a-z' linkki='?search=1'/>
                <Nappi teksti='z-a' linkki='?search=2'/>
                <Nappi teksti='vanha-uusi' linkki='?search=3'/>
                <Nappi teksti='uusi-vanha' linkki='/'/>
            </div>
            
            <div className='grid gap-4 lg:grid-cols-4 sm:grid-cols-2 mr-5 ' >
                
            {elokuvat.sort(jarjesta).map((e : Elokuva, idx : number) => {
                return(
                    
                        <Elokuvakortti elokuva={e} key={idx}/>
                    
                )
            })}
            </div>

        </div>
    )
}
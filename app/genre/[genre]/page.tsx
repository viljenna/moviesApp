import { Elokuva, haeGenrella } from '@/lib/elokuvarekisteri';
import Elokuvakortti from '@/components/Elokuvakortti';
import Nappi from '@/components/Nappi';
import Link from 'next/link';

interface Props {
    params : {
        genre : string
    };
    searchParams?: {
        search?: string
    }
}

export default async function GenrePage({params, searchParams} : Props) {
    
    const muokkaaGenre = (genre : string) => {
        let iso : string = genre[0].toUpperCase();
        let nimi : string = genre.replace(genre[0], iso)

        let oikeaNimi : string;

        switch (nimi) {
            case "Elamankerta" : oikeaNimi = "Elämänkerta";break;
            case "Jannitys" : oikeaNimi = "Jännitys";break;
            case "Scifi" : oikeaNimi = "Sci-Fi";break;
            case "Filmnoir" : oikeaNimi = "Film-Noir";break;
            default : oikeaNimi = nimi; break;
        }
        return oikeaNimi;
    }

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
                
            }
        }
    }

    const elokuvat : Elokuva[] = await haeGenrella(muokkaaGenre(params.genre));


    return(
        <div className='space-y-4'>
            
            <h2 className='flex justify-center text-3xl text-rose-800 mb-8 dark:text-slate-100'>{muokkaaGenre(params.genre)}</h2>

            <div className='flex justify-center text-rose-100'>
                <h4 className='text-2xl self-center text-rose-800 dark:text-slate-100'>Järjestä:</h4>
                <Nappi teksti='a-z' linkki={`/genre/${params.genre}?search=1`}/>
                <Nappi teksti='z-a' linkki={`/genre/${params.genre}?search=2`}/>
                <Nappi teksti='vanha-uusi' linkki={`/genre/${params.genre}?search=3`}/>
                <Nappi teksti='uusi-vanha' linkki={`/genre/${params.genre}`}/>
                
            </div>



            <div className='grid gap-4 lg:grid-cols-4 sm:grid-cols-2'>
                {elokuvat.sort(jarjesta).slice(0,40).map((e : Elokuva, idx: number) => {
                    return(
                        
                        <Elokuvakortti elokuva={e} idx={idx}/>
                            
                        
                    )
                })}
                
            </div>

    
            {(searchParams.search)
            ?
            <div className="btn-group flex justify-center">
                <Link 
                    className="btn ring-1 ring-rose-800 bg-rose-400 rounded-md text-center text-rose-100 dark:bg-slate-700 dark:text-slate-100 dark:ring-slate-100" 
                    href={`/genre/${params.genre}/2?search=${searchParams?.search}`}
                >
                <p>Seuraava</p>
                </Link>
            </div>
            :
            <div className="btn-group flex justify-center">
                <Link 
                    className="btn ring-1 ring-rose-800 bg-rose-400 rounded-md text-center text-rose-100 dark:bg-slate-700 dark:text-slate-100 dark:ring-slate-100" 
                    href={`/genre/${params.genre}/2`}
                >
                <p>Seuraava</p>
                </Link>
            </div>
        }
            

            <div className='flex justify-center'>
                <Nappi teksti='Palaa etusivulle' linkki='/'/>
            </div>
            
        </div>
    )
}
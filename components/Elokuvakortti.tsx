
import { Elokuva } from "@/lib/elokuvarekisteri";
import Link from "next/link";
import Image from 'next/image';

interface Props {
    elokuva : Elokuva
}

function Elokuvakortti ({elokuva} : Props) : React.ReactElement {
    return(
        
        <Link 
            
            href={`/elokuva/${elokuva._id}`}
            className=
                'text-rose-800 ring-1 p-6 ring-rose-800 bg-rose-200 dark:bg-slate-600 dark:text-slate-100 dark:ring-slate-100 hover:bg-rose-800 hover:text-rose-100' >
                <div className="flex justify-center ">
                    <Image  src={`https://image.tmdb.org/t/p/w185/${elokuva.tmdbkuva}`} alt={elokuva.alkuperainennimi} width={250} height={250}/>
                    </div>
                <h3 className='text-xl mt-2 text-center font-Permanent tracking-widest'>{elokuva.nimi}</h3>
                <p className='text-center'>{elokuva.genre[0]} {elokuva.valmistumisvuosi}</p>
                        
        </Link>
    )
}

export default Elokuvakortti;
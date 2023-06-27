import { Elokuva } from "@/lib/elokuvarekisteri";
import Image from 'next/image';
import AddRemoveKatselulistalta from "./AddRemoveKatselulistalta";
import Nappi from "./Nappi";


interface Props {
    elokuva : Elokuva
    casti : Movie
    lisatiedot : any[]
}

function ElokuvaInfo ( {elokuva, casti, lisatiedot} : Props) : React.ReactElement {
 
    const laskeAika = (aika : number) => {

        let h : number = parseInt((aika/60).toString());
        let min : number = aika-h*60;

        if (h === 0) {
            return `${aika}min`;
        } else {
            return `${h}h ${min}min`;
        }
    }

    const handleYhtenveto = () => {
        if (casti.overview == "") {
            return lisatiedot.movie_results[0].overview
        } else {
            return casti.overview
        }
    }


    return(
        <>
        <div className='flex ring-1 ring-rose-800 mt-2 p-4 gap-4 bg-rose-200 text-rose-800 sm:flex-col lg:flex-row dark:bg-slate-700 dark:text-slate-100 dark:ring-slate-100'>
                
                <Image className='basis-1/2' src={`https://image.tmdb.org/t/p/w185/${elokuva.tmdbkuva}`} alt={elokuva.alkuperainennimi} width={350} height={350}/>
                
                    
                <div className='basis-1/2'>

                    <div className='space-y-3 mb-14'>
                        {(elokuva.nimi.toLowerCase() === elokuva.alkuperainennimi.toLowerCase())
                        ? <h2 className='text-2xl font-Permanent tracking-widest'>{elokuva.nimi}</h2>
                        :<h2 className='text-2xl font-Permanent tracking-widest'>{elokuva.nimi} <br/>({elokuva.alkuperainennimi})</h2>
            }       
                        
                        <p className='flex-auto text-ellipsis overflow-hidden max-h-48 mb-1 sm: max-h-36'>{handleYhtenveto()}</p>
                        
                        <div className='text-right mr-3 text-blue-800 dark:text-blue-300'>
                            <label htmlFor="my-modal" className="cursor-pointer">Lue lisää...</label>
                        </div>
                       
                    
                        <p className='mt-4'>Genre: {elokuva.genre.join(", ")}</p>
                        <p>Valmistumisvuosi: {elokuva.valmistumisvuosi}</p>
                        <p>Kesto: {laskeAika(elokuva.kestomin)} </p>
                        <p>Näyttelijät:
                            
                            {casti.credits.cast.slice(0,5).map((actor : Cast) => {
                                return(
                                    actor.name
                                )
                            }).join(", ")}
                        </p>
                        <p>Ohjaaja: {elokuva.ohjaaja.join(", ")}</p>
                    </div>

                    <div className=' flex text-center mb-5'>
                        <Nappi teksti='Palaa etusivulle' linkki='/'/>
                    </div>

                    <AddRemoveKatselulistalta 
                        _id ={elokuva._id.toString()} 
                        nimi={elokuva.nimi} 
                        genre={elokuva.genre} 
                        valmistumisvuosi={elokuva.valmistumisvuosi} 
                        tmdbkuva={elokuva.tmdbkuva} 
                        alkuperainennimi={elokuva.alkuperainennimi} />
                    
                </div>
            </div>

            
            <input type="checkbox" id="my-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box text-rose-800 bg-rose-100 dark:bg-slate-700 dark:text-slate-100">
                    <h3 className="text-2xl">{elokuva.nimi}</h3>
                    <p className="py-4">{handleYhtenveto()}</p>
                    <div className="modal-action">
                        <label htmlFor="my-modal" className="ring-1 ring-rose-800 bg-rose-400 p-3 rounded-md text-center text-rose-100 px-10 dark:bg-slate-800 dark:text-slate-100 dark:ring-slate-100 cursor-pointer hover:bg-rose-800">Sulje</label>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ElokuvaInfo;
import Link from "next/link";
import Image from 'next/image';

function Karuselli () : React.ReactElement {

    return(
        <div>
        <div className="carousel w-full bg-rose-200 dark:bg-slate-700 dark:text-slate-100 text-rose-800">
            <div id="item1" className="carousel-item w-full">
                <Link className='flex lg:flex-row items-center gap-8 px-10 py-8  mx-4 sm:flex-col w-full' href={`/elokuva/63da2a25be2747dc4339800a`}>
                            
                    <Image src={`https://image.tmdb.org/t/p/w185/rKvCys0fMIIi1X9rmJBxTPLAtoU.jpg`} alt='eeaao' width={350} height={350} className=""/>
                    <div>
                        <h3 className='text-2xl text-center font-Permanent tracking-widest mb-8'>Everything everywhere all at once</h3>
                        <p>Julkaistu: 2022</p>
                        <p>Näyttelijät: Michelle Yeoh, Stephanie Hsu, Ke Huy Quan, James Hong, Jamie Lee Curtis</p>
                        <p>Ohjaaja: Dan Kwan, Daniel Scheinert</p>

                    </div>
                </Link>
            </div> 
            <div id="item2" className="carousel-item w-full">
                <Link className='flex lg:flex-row items-center gap-8 px-10 py-8 mx-4 sm:flex-col w-full' href={`/elokuva/63da2a25be2747dc43397f46`}>
                            
                    <Image src={`https://image.tmdb.org/t/p/w185/uM8tD7qNdB2nOKJOfPkLGgPv1Bd.jpg`} alt='encanto' width={350} height={350} className=""/>
                    <div>      
                        <h3 className='text-2xl text-center font-Permanent tracking-widest mb-8'>Encanto</h3>
                        <p>Julkaistu: 2021</p>
                        <p>Näyttelijät: Stephanie Beatriz, María Cecilia Botero, John Leguizamo, Mauro Castillo, Jessica Darrow</p>
                        <p>Ohjaaja: Jared Bush, Byron Howard, Charise Castro Smith</p>
                    </div>         
                </Link>
            </div> 
            <div id="item3" className="carousel-item w-full">
                <Link className='flex lg:flex-row items-center gap-8 px-10 py-8 mx-4 sm:flex-col w-full' href={`/elokuva/63da2a25be2747dc43397fb9`}>
                            
                        <Image src={`https://image.tmdb.org/t/p/w185/nrcAqAXskFir6r6vDcab7zfSsyF.jpg`} alt='dyyni' width={350} height={350} className=""/>
                        <div>   
                            <h3 className='text-2xl text-center font-Permanent tracking-widest mb-8'>Dyyni</h3>
                            <p>Julkastu: 2021</p>
                            <p>Näyttelijät: Timothée Chalamet, Rebecca Ferguson, Oscar Isaac, Josh Brolin, Stellan Skarsgård</p>
                            <p>Ohjaaja: Denis Villeneuve</p>
                        </div>    
                </Link>
            </div> 
            
        </div>
        <div className="flex justify-center w-full py-2 gap-2 text-rose-100">
                <a href="#item1" className="ring-1 ring-rose-800 bg-rose-400 px-4 py-2 rounded-md text-center mx-2 dark:bg-slate-700 dark:ring-slate-100 dark:text-slate-100 hover:bg-rose-800">1</a> 
                <a href="#item2" className="ring-1 ring-rose-800 bg-rose-400 px-4 py-2 rounded-md text-center mx-2 dark:bg-slate-700 dark:ring-slate-100 dark:text-slate-100 hover:bg-rose-800">2</a> 
                <a href="#item3" className="ring-1 ring-rose-800 bg-rose-400 px-4 py-2 rounded-md text-center mx-2 dark:bg-slate-700 dark:ring-slate-100 dark:text-slate-100 hover:bg-rose-800">3</a>
            </div>
        </div>
    )
}

export default Karuselli;
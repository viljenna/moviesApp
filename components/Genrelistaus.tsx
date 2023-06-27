import Link from 'next/link';
import { BiMenu } from 'react-icons/bi'

interface Props {
  children : any
}

function Genrelistaus({children} : Props) : React.ReactElement {

    const genret : string[] = ["Komedia",
                            "Lyhytelokuva",
                            "Draama",
                            "Elämänkerta",
                            "Historia",
                            "Fantasia",
                            "Kauhu",
                            "Perhe",
                            "Romantiikka",
                            "Toiminta",
                            "Seikkailu",
                            "Sota",
                            "Western",
                            "Sci-Fi",
                            "Mysteeri",
                            "Jännitys",
                            "Musiikki",
                            "Musikaali",
                            "Rikos",
                            "Urheilu",
                            "Dokumentti",
                            "Animaatio",
                            "Film-Noir"
                          ]

    const aakkoset = (genre : string) => {

        let pienet : string = genre.toLowerCase();
        let aakkonen : string = pienet.replaceAll("ä", "a");
        aakkonen = aakkonen.replaceAll("ö", "o");
        aakkonen = aakkonen.replaceAll("-","");
                        
        return aakkonen
    }

    return(
        
        <>
        <div className="drawer drawer-mobile ">
        <input id="GenreModal" className="drawer-toggle" type="checkbox"/>

        <div className="drawer-content">

          <div className='flex flex-row px-4 pb-10'>
            <label htmlFor="GenreModal" className="btn bg-rose-400 drawer-button border-rose-400 mr-6 hover:bg-rose-800 dark:bg-slate-700 dark:border-slate-100 dark:text-slate-100 lg:hidden ">
              <BiMenu
                color='white'
                size={28}/>
            </label>

            {children}
            </div>
        </div> 

        <div className="drawer-side ">
          <label htmlFor="GenreModal" className="drawer-overlay bg-base-100"></label> 
          <ul className='menu p-4 w-36 mb-10 bg-rose-100 text-rose-800 dark:bg-slate-600 dark:text-white '>
            

            {genret.map((g:string, idx:number) => {
              return(
                <li key={idx}>
                  <Link href={`/genre/${aakkoset(g)}`}>{g}</Link>
                </li>
              )
            })}
            </ul>
          
          </div>
        </div>
          
        </>
    )
}

export default Genrelistaus;
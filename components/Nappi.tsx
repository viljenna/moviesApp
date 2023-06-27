import Link from "next/link";

interface Props {
    teksti : string
    linkki : string
}

function Nappi ({teksti, linkki} : Props) : React.ReactElement {
    return(
        <>
            
        <Link className='ring-1 ring-rose-800 bg-rose-400 py-3 px-8 rounded-md text-center text-rose-100 text-lg mx-2 dark:bg-slate-700 dark:ring-slate-100 dark:text-slate-100 hover:bg-rose-800' href={linkki}>{teksti}</Link>
        
        </>
    )
}

export default Nappi;
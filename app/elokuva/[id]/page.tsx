import { Elokuva, haeElokuva } from '@/lib/elokuvarekisteri';
import ElokuvaInfo from '@/components/ElokuvaInfo';

interface Props {
    params : {
        id : string
    }
}

export default async function ElokuvaPage({params} : Props) {

    const elokuva : Elokuva = await haeElokuva(params.id);

    const haeApiData = async () : Promise<any> => {
        const yhteys = await fetch(`https://api.themoviedb.org/3/find/${elokuva.imdbid}?api_key=${process.env.API_KEY}&external_source=imdb_id`);
        return await yhteys.json();
    }
    
    const haeCast = async () : Promise<any> => {
        const yhteys = await fetch(`http://api.themoviedb.org/3/movie/${id}?api_key=${process.env.API_KEY}&language=fi-FI&append_to_response=credits`)
        return yhteys.json();
    }

    const lisatiedot : any[] = await haeApiData();
    const id : string = JSON.stringify(lisatiedot.movie_results[0].id);
    const casti : Movie = await haeCast();



    return(
        <>
            
            <ElokuvaInfo 
                elokuva={elokuva}
                casti={casti}
                lisatiedot={lisatiedot} 
                
            />
            
   
        </>
    )
}
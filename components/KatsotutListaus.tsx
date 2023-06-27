'use client'

import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import Elokuvakortti from "./Elokuvakortti";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

function KatsotutListaus () : React.ReactElement {
    
    const [elokuvat, setElokuvat] = useState<any>();
    const supabase = createBrowserSupabaseClient();
    
    const paivita = async () : Promise<void> => {
        let sessionId = (await supabase.auth.getSession()).data.session?.user.id;
        console.log(sessionId)
        setElokuvat(await supabase.from('katselulista').select('*').eq('user', sessionId));
        
    }


    useEffect(() => {
        paivita();
    }, []);
   
    return(
        <div>
            <p className="text-3xl text-rose-800 text-center">Katselulista</p>
            <div className='grid gap-4 lg:grid-cols-4 sm:grid-cols-2 mr-5 mt-8' >
                
                {(elokuvat)
                ? (!elokuvat.error)

                    ? elokuvat.data.map((e : any, idx : number) => {
                            return <Elokuvakortti elokuva={e} key={idx}/>
                        })
                    : <p>Ei lisättyjä elokuvia</p>
                : null
                }
            
            </div>
        </div>
    )
}

export default KatsotutListaus;
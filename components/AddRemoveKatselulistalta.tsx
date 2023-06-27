'use client'

import { MdAdd, MdRemove } from 'react-icons/md'
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';

interface Props {
    _id : string
    nimi : string
    genre : string[]
    valmistumisvuosi : number
    tmdbkuva : string
    alkuperainennimi : string
}

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

function AddRemoveKatselulistalta ({_id, nimi, genre, valmistumisvuosi, tmdbkuva, alkuperainennimi} : Props) : React.ReactElement {

    const [loytyy, setloytyy] = useState<boolean>();
    const supabase = createBrowserSupabaseClient();

    const lisaaElokuva = async () : Promise<void> => {

        let sessionId = (await supabase.auth.getSession()).data.session?.user.id;
        const {data, error} = await supabase.from('katselulista').insert(
            [{
                _id : _id.toString(),
                nimi : nimi,
                genre : genre,
                valmistumisvuosi : valmistumisvuosi,
                tmdbkuva : tmdbkuva,
                alkuperainennimi : alkuperainennimi,
                user : sessionId
            }]
        ) 
        console.log(error?.message)
    }


    const poistaElokuva = async () : Promise<void> => {
        let sessionId = (await supabase.auth.getSession()).data.session?.user.id;
        await supabase.from('katselulista').delete().eq('_id', _id).eq('user', sessionId);
        setloytyy(false);
    }

    const tarkistaLisays = async () : Promise<void> => {
        
        let sessionId = (await supabase.auth.getSession()).data.session?.user.id;
        const {data, error} = await supabase.from('katselulista').select('*').eq('user', sessionId);
        
        if (!error) {
            data.map((a : any) => {
                
                if (a._id === _id) {
                    setloytyy(true)
                } else {
                    setloytyy(false)
                }
            })
        } else {
            console.log(error.message)
        }
        
        
        
    }

    const tilaaKanava = supabase.channel('schema-db-changes')
        .on('postgres_changes', 
            {
                event : '*',
                schema : 'public'
            }, 
            tarkistaLisays
            )
        .subscribe();


    useEffect(() => {
        tarkistaLisays();
    }, []);

  

    return(
        <div className="flex">
        {(loytyy)
            ?  <button className='flex ring-1 ring-rose-800 bg-rose-400 py-3 px-3 rounded-md text-center text-rose-100 text-lg mx-2 dark:bg-slate-700 dark:ring-slate-100 dark:text-slate-100 hover:bg-rose-800'
                    onClick={poistaElokuva}>
                    <MdRemove size={24}/>Poista listauksesta
                </button>

            :  <button className='flex ring-1 ring-rose-800 bg-rose-400 py-3 px-3 rounded-md text-center text-rose-100 text-lg mx-2 dark:bg-slate-700 dark:ring-slate-100 dark:text-slate-100 hover:bg-rose-800'
                    onClick={lisaaElokuva}>
                <MdAdd size={27} color='white'/>Lisää listaukseen
                </button>
        }     
        </div>
    )
}
export default AddRemoveKatselulistalta;
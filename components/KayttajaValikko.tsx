'use client'

import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BiUser } from "react-icons/bi";

function KayttajaValikko () : React.ReactElement {
    
    const [kayttaja, setKayttaja] = useState<string>("");
    const router = useRouter();
    
    const haeTiedot = async () : Promise<void> => {
        const supabase = createBrowserSupabaseClient();
        const {data} = await supabase.auth.getUser();
        
        if(data.user && data.user.email) {
            setKayttaja(data.user.email)
            
        } else {
            setKayttaja("tuntematon käyttäjä")
        }
    }

    const logOut = async () => {
        const supabase = createBrowserSupabaseClient();
        const {error} = await supabase.auth.signOut();
        router.push("/login");
    }
    
    useEffect(() => {
        haeTiedot()
        
    })

    return (
        <div className='dropdown'>
            <label tabIndex={0}>
                <button className="bg-rose-400 rounded-full p-3 dark:bg-slate-600">
                     <BiUser
                        size={42}
                        color={'white'}/>
                    
                </button>
            </label>
            <ul tabIndex={0} className="dropdown-content menu bg-rose-200 text-rose-800 dark:bg-slate-600 mt-4 dark:text-slate-100 ring-1 ring-rose-800 dark:ring-rose-100 p-3">
                <li key={1} className="p-3">{kayttaja}</li>
                <li key={2}>
                    <a className="p-3" href="/katselulista">Katselulista</a>
                </li>
                <li key={3}>
                    <a className="p-3" href="/uusiSalasana">Vaihda salasana</a>
                </li>
                <li key={4}>
                    <button
                    onClick={logOut}
                    className='p-3 text-blue-600 dark:text-blue-300'
                >
                    Kirjaudu ulos
                </button>
                </li>
            </ul>
        </div>
    )
}

export default KayttajaValikko;
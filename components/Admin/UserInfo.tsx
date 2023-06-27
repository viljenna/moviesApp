'use client'
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";


function UserInfo () : React.ReactElement {

    const supabase = createBrowserSupabaseClient();
    const [users, setUsers] = useState<any>();

    const haeKayttajat = async () : Promise<void> => {
        const {data} = await supabase.auth.getSession();
        console.log("HEO")
        
        console.log(data.session)
        
        setUsers(await supabase.from('users').select().eq('admin', false));
        console.log(await supabase.from('users').select().eq('admin', false))
        console.log(users)
    }

    useEffect(() => {
        haeKayttajat();
    },[])

    return(
        <div className="">
            <p>MOIKKAMOI</p>
            {(users)
            ? users.data.map((u : any, idx : number) => {
                return <p key={idx}>{u.data}</p>
            })
            :null
            }

            

            <div className="w-16 h-16 bg-rose-900"></div>
        </div>
    )
}

export default UserInfo;
'use client'

import xamkflix from '../../public/xamkflix.png';
import Image from 'next/image';
import AdminTools from '@/components/AdminTools';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { useEffect, useRef, useState } from 'react';

function AdminPage () : React.ReactElement {

    const supabase = createBrowserSupabaseClient();
    const [kirjautunut, setKirjautunut] = useState<boolean>(false);
    const lomakeRef : React.MutableRefObject<any> = useRef<HTMLFormElement>();
    const [virhe, setVirhe] = useState<string>("");
    const [userId, setUserId] = useState<any>();
    
    const haeTiedot = async () : Promise<void> => {
        
        const {data, error} = await supabase.auth.getSession();
        
        if (data.session) {
            let adminId : any = (await supabase.from('users').select('id').eq('admin', true)).data;
            if (adminId[0].id && data.session.user.id === adminId[0].id) {
                setKirjautunut(true)
                setUserId(data.session.user.id);
            } else {

                setVirhe("Ei ylläpitäjäoikeuksia.")
                const {error} = await supabase.auth.signOut();
            }
            
            
        } else if (error) {
            console.log(error.message)
            setKirjautunut(false)
            setVirhe("Virheellinen adminkäyttäjätunnus.")
        }
        console.log(kirjautunut)
    }

    const adminKirjaudu = async (e:React.FormEvent) : Promise<void> => {
        e.preventDefault();
            
            const {data, error} = await supabase.auth.signInWithPassword({
                email : lomakeRef.current.tunnus.value,
                password : lomakeRef.current.salasana.value 
                
            })
            haeTiedot();

            if (!userId) {
    
                setVirhe("Virheellinen käyttäjätunnus tai salasana.")
    
            }
    }

    useEffect (() => {
        haeTiedot()
    }, [])

    return (
        <>
        {!kirjautunut
        ? <div className="container mx-auto h-fit mt-10 w-80 ring-1 ring-rose-800 bg-rose-400">
            <Image src={xamkflix} alt="xamkflix" className='px-8 pt-8'/>

            <form className="p-6" ref={lomakeRef}>

                <p className='text-center text-xl text-rose-900 mb-4'>Ylläpitäjäkirjautuminen</p>
                <p className='mb-1 text-rose-100 text-lg'>Käyttäjätunnus:</p>
                <input type="text" name="tunnus" placeholder="Käyttäjätunnus" className="input input-bordered w-full border-rose-400 rounded-none text-rose-800"/>
                <p className='mb-1 mt-2 text-rose-100 text-lg'>Salasana:</p>
                <input type="password" name="salasana" placeholder="Salasana" className="input input-bordered w-full border-rose-400 rounded-none text-rose-800"/>
                
                
                {(Boolean(virhe))
                        ? <div className='alert alert-error bg-rose-100 text-red-500 rounded-md mt-4 ring-2 ring-red-700 text-lg'>{virhe}</div>
                        :null
                }
            </form>
        <button onClick={adminKirjaudu} className="flex btn m-4 text-base border-rose-800 bg-rose-100 text-rose-800 hover:bg-rose-800 hover:text-rose-100">Kirjaudu sisään</button>
        </div>
    :<AdminTools/>
    }
        
        </>
    )
}

export default AdminPage;
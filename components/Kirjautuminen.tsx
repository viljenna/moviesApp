'use client'

import xamkflix from '../public/xamkflix.png';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';


function Kirjautuminen () : React.ReactElement {


    const lomakeRef : React.MutableRefObject<any> = useRef<HTMLFormElement>();
    const router = useRouter();
    const [virhe, setVirhe] = useState<string>("");
    const supabase = createBrowserSupabaseClient();

    const kirjaudu = async (e: React.FormEvent) : Promise<void>=> {
        e.preventDefault();

        const {data, error} = await supabase.auth.signInWithPassword({
            email : lomakeRef.current.tunnus.value,
            password : lomakeRef.current.salasana.value 
            
        })

        if (!error) {
            setVirhe("");
            router.push("/");

        } else {

            setVirhe("Virheellinen käyttäjätunnus tai salasana. Tarkasta tiedot ja yritä uudelleen.")

        }

    }



    return(
    
        <div className="container mx-auto h-fit mt-10 w-80 ring-1 ring-rose-800 bg-rose-400">
            <Image src={xamkflix} alt="xamkflix" className='px-8 pt-8'/>
        <form className="p-6" ref={lomakeRef}>

            <p className='mb-1 text-rose-100 text-lg'>Käyttäjätunnus:</p>
            <input type="text" name="tunnus" placeholder="Käyttäjätunnus" className="input input-bordered w-full border-rose-400 rounded-none text-rose-800"/>
            <p className='mb-1 mt-2 text-rose-100 text-lg'>Salasana:</p>
            <input type="password" name="salasana" placeholder="Salasana" className="input input-bordered w-full border-rose-400 rounded-none text-rose-800"/>
            <button onClick={kirjaudu} className="btn my-4 text-base w-full border-rose-800 bg-rose-100 text-rose-800 hover:bg-rose-800 hover:text-rose-100">Kirjaudu sisään</button>
            
            <div className='grid justify-items-evenly grid-cols-2'>
                <Link 
                    href="/emailLink"
                    className='text-rose-100 bg-rose-800 p-2 mr-2 rounded text-center'>Unohtuiko salasana?</Link>
                <Link 
                    href="/signUp"
                    className='text-rose-100 bg-rose-800 p-2 rounded text-center self-center py-5'>Rekisteröidy</Link>
            </div>
            {(Boolean(virhe))
                    ? <div className='alert alert-error bg-rose-100 text-red-500 rounded-md mt-4 ring-2 ring-red-700 text-lg'>{virhe}</div>
                    :null
            }
        </form>
        </div>
    )
}

export default Kirjautuminen;
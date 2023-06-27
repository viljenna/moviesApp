'use client'

import { useRef, useState } from 'react';
import { createBrowserSupabaseClient} from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation';
import xamkflix from '../../public/xamkflix.png';
import Image from 'next/image';
import Link from 'next/link';
import Kirjautuminen from '@/components/Kirjautuminen';


function LoginPage() : React.ReactElement {

    const lomakeRef : React.MutableRefObject<any> = useRef<HTMLFormElement>();
    const router = useRouter();
    const [virhe, setVirhe] = useState<string>("");

    const kirjaudu = async (e: React.FormEvent) : Promise<void>=> {
        
        e.preventDefault();

        const supabase = createBrowserSupabaseClient();

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
        <Kirjautuminen/>
        
    )
}

export default LoginPage;
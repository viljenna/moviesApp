'use client'

import xamkflix from '../../public/xamkflix.png';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

function EmailLinkPage () : React.ReactElement {

    const lomakeRef : React.MutableRefObject<any> = useRef<HTMLFormElement>();
    const router = useRouter();
    const [virhe,setVirhe] = useState<string>("");

    const sendLink = async (e: React.FormEvent) : Promise<void> => {
        e.preventDefault();
        const supabase = createBrowserSupabaseClient();
        const sposti : string = lomakeRef.current.email.value;
        const {data,error} = await supabase.auth.resetPasswordForEmail(sposti, {
            redirectTo: 'http://localhost:3000/uusiSalasana',
        })
        if (!error) {
            router.push("/");
        } else {
            setVirhe(error.message);
        }
        
    }
    
    return(
        <div className="container mx-auto h-fit mt-10 w-80 ring-1 ring-rose-800 bg-rose-400">
            
            <Image src={xamkflix} alt="xamkflix" className='px-8 pt-8'/>
            <form className="p-6" ref={lomakeRef}>

                <p className='mb-1 text-rose-100 text-lg'>Sähköpostiosoite:</p>
                <input type="text" name="email" placeholder="Sähköposti" className="input input-bordered w-full border-rose-400 rounded-none text-rose-800"/>
                
                <button onClick={sendLink} className="btn mt-4 text-base w-full border-rose-800 bg-rose-100 text-rose-800 hover:bg-rose-800 hover:text-rose-100">Lähetä linkki</button>
                {virhe
                ?  <div className='alert alert-error bg-rose-100 text-red-500 rounded-md mt-4 ring-2 ring-red-700 text-lg'>{virhe}</div>
            : null
            }
            </form>
           
            
            
        </div>
    )
}

export default EmailLinkPage;
'use client'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import xamkflix from '../../public/xamkflix.png';
import Image from 'next/image';

function UusiSalasanaPage() : React.ReactElement {

    
    const lomakeRef : React.MutableRefObject<any> = useRef<HTMLFormElement>();
    const router = useRouter();
    const [virhe, setVirhe] = useState<string>("");
    const supabase = createBrowserSupabaseClient();
    
    
    const asetaSalasana = async (e : React.FormEvent) : Promise<void> => {
        
        e.preventDefault();

        const pswd : string = lomakeRef.current.salasana.value;
        
        const {data, error} = await supabase.auth.updateUser({password : pswd});
        
        if (!error) {
            router.push("/");
        } else {
            setVirhe(error.message);
        }
    }

    useEffect(() => {
        const session = supabase.auth.getSession();
    })

    return(
        <div className="container mx-auto h-fit mt-10 w-80 ring-1 ring-rose-800 bg-rose-400">
           
            <Image src={xamkflix} alt="xamkflix" className='px-8 pt-8'/>
            <form className="p-6" ref={lomakeRef}>
           
                <p className='mb-1 mt-2 text-rose-100 text-lg'>Syötä uusi salasana:</p>
                <input type="password" name="salasana" placeholder="Salasana" className="input input-bordered w-full border-rose-400 rounded-none text-rose-800"/>
                <button 
                onClick={asetaSalasana}
                className="btn mt-4 text-base w-full border-rose-800 bg-rose-100 text-rose-800 hover:bg-rose-800 hover:text-rose-100"
                >Vaihda salasana</button>

                <Link 
                href={"/"}
                className="btn mt-4 text-base w-full border-rose-800 bg-rose-800 text-rose-100 hover:bg-rose-100 hover:text-rose-800"
                >Takaisin</Link>
                
                {(virhe)
                ? <div className='alert alert-error bg-rose-100 text-red-500 rounded-md mt-4 ring-2 ring-red-700 text-lg'>{virhe}</div>
                : null
                }
            </form>
            
            
        </div>
        
    )
}

export default UusiSalasanaPage;
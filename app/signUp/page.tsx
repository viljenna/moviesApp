'use client'

import { useRef, useState } from "react";
import xamkflix from '../../public/xamkflix.png';
import Image from 'next/image';
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";

function SignUpPage () : React.ReactElement {

    const lomakeRef : React.MutableRefObject<any> = useRef();
    const [virhe, setVirhe] = useState<string>("");
    const supabase = createBrowserSupabaseClient();
    const [onnistui, setOnnistui] = useState<string>("");

    const signUp = async (e : React.FormEvent) => {
        e.preventDefault();

        let pswd1 : string = lomakeRef.current.pswd1.value;
        let pswd2 : string = lomakeRef.current.pswd2.value;
        let email : string = lomakeRef.current.email.value;

        if (email && pswd1 === pswd2) {
            if (email.includes("@") && email.includes(".")) {
                if (pswd1.length > 5) {
                    const {data, error} = await supabase.auth.signUp({
                        email: email,
                        password: pswd1,
                    })
                    setOnnistui("Vahvistusviesti lähetetty sähköpostiisi.")
                }
            }
            
        } else {
            setVirhe("Varmista, että salasana ja sähköposti ovat oikein.")
        }
    }
    return(
        <div className="container mx-auto h-fit mt-10 w-80 ring-1 ring-rose-800 bg-rose-400">
            
            <Image src={xamkflix} alt="xamkflix" className='px-8 pt-8'/>
            <form className="p-6" ref={lomakeRef}>

            <p className='mb-1 text-rose-100 text-lg'>Sähköpostiosoite:</p>
            <input type="text" name="email" placeholder="Sähköposti" className="input input-bordered w-full border-rose-400 rounded-none text-rose-800"/>

            <p className='mb-1 text-rose-100 text-lg'>Salasana:</p>
            <input type="password" name="pswd1" placeholder="salasana" className="input input-bordered w-full border-rose-400 rounded-none text-rose-800"/>
            <p className='mb-1 text-rose-100 text-lg'>Salasana uudelleen</p>
            <input type="password" name="pswd2" placeholder="salasana" className="input input-bordered w-full border-rose-400 rounded-none text-rose-800"/>
            
            <button onClick={signUp} className="btn mt-4 text-base w-full border-rose-800 bg-rose-100 text-rose-800 hover:bg-rose-800 hover:text-rose-100">Rekisteröidy</button>

            {virhe
            ?  <div className='alert alert-error bg-rose-100 text-red-500 rounded-md mt-4 ring-2 ring-red-700 text-lg'>{virhe}</div>
            : null
            }
            {onnistui
            ? <div className='alert alert-success bg-green-200 text-green-900 rounded-md mt-4 ring-2 ring-green-700 text-lg'>{onnistui}</div>
            : null
            }
            </form>
        </div>
    )
}

export default SignUpPage;
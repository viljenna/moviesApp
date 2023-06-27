import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import NostojenHallinta from "./Admin/NostojenHallinta";
import UserInfo from "./Admin/UserInfo";

function AdminTools () : React.ReactElement {

    const router = useRouter();
    const [valinta, setValinta] = useState<string>("");
    
    const kirjauduUlos = async () : Promise<void> => {
        const supabase = createBrowserSupabaseClient();
        const {error} = await supabase.auth.signOut();
        router.push("/");
    }

    return(

        <div className="bg-rose-200 m-4 p-5">
            <p className="text-2xl mb-4">Admin tools</p>
            <ul className="menu menu-vertical mb-4 lg:menu-horizontal bg-base-200 rounded-box">
                <li><a className="link link-hover" onClick={() => setValinta("kayttaja")}>Käyttäjähallinta</a></li>
                <li><a className="link link-hover" onClick={() => setValinta("nostot")}>Nostojen hallinta</a></li>
                <li><a className="link link-hover">Käyttötilastot</a></li>
                <li><a className="link link-hover">Uuden elokuvan lisääminen</a></li>
                <li><a className="link link-hover">Elokuvatietojen muokkaus ja poisto</a></li>
                
            </ul>
            
                {(valinta == "kayttaja")
                ? <UserInfo/>
                : (valinta == "nostot")
                ? <NostojenHallinta/>
                : <p>Tervetuloa</p>
            }
            <button className="btn mt-5" onClick={kirjauduUlos}>KIRJAUDU ULOS</button>
        </div>
    )
}
export default AdminTools;
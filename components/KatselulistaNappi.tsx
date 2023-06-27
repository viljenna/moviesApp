'use client'
import { VscAdd, VscDash } from "react-icons/vsc";

function KatselulistaNappi () : React.ReactElement {
    
    return (
        <div>
        
        <label className="swap swap-rotate">
                        <input type="checkbox"/>
                        <svg className="swap-on fill-current"><VscAdd/></svg>
                        <svg className="swap-off fill-current"><VscDash/></svg>
                        
                    </label>
                    </div>
    )
}

export default KatselulistaNappi;
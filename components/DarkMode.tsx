'use client'

import { useTheme } from 'next-themes';
import { MdOutlineDarkMode } from 'react-icons/md';


function DarkMode () : React.ReactElement {

    const { theme, setTheme } = useTheme();
      
    return(
        <>
            <button
                onClick={() => theme == 'dark'? setTheme('light'): setTheme('dark')}
                className='p-3 m-3 rounded-full ring-3 ring-rose-700 bg-rose-400 dark:bg-slate-600'
            >
                <MdOutlineDarkMode 
                    size={42}
                    color={'white'}
                    />
            </button>
        </>
    )
}

export default DarkMode;
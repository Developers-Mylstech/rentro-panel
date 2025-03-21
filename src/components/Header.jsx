import React, { useRef, useEffect, useState } from 'react';
import { Menu } from 'primereact/menu';
import { useNavigate } from 'react-router-dom';

export default function Header() {
    const menuRef = useRef(null);
    const navigate = useNavigate();
    const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode(prevMode => !prevMode);
    };

    const items = [
        {
            label: 'Options',
            items: [
                {
                    label: 'Setting',
                    icon: 'pi pi-cog',
                    command: () => console.log("Settings Clicked")
                },
                {
                    label: 'Log out',
                    icon: 'pi pi-sign-out',
                    command: () => navigate('/')
                }
            ]
        }
    ];

    return (
        <div className="flex justify-end py-5 border-b sticky z-50 px-10 gap-5 top-0 transition-all duration-300 
                        bg-white text-black dark:bg-gray-900 dark:text-dark">
            <Menu model={items} popup ref={menuRef} id="popup_menu_left" />



            <button
                onClick={toggleDarkMode}
                className="p-3 rounded-md transition-all duration-300  text-black  dark:text-white"
            >
                {darkMode ? <i className="pi pi-sun"></i>
                    : <i className="pi  pi-moon"></i>
                }
            </button>


            <div className='flex gap-3 items-center' onClick={(event) => menuRef.current.toggle(event)}>
                <i className="pi pi-user text-lg cursor-pointer dark:text-white" aria-controls="popup_menu_left" aria-haspopup />
            </div>
        </div>
    );
}

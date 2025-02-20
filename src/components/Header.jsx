import React, { useRef } from 'react';
import { Menu } from 'primereact/menu';
import { Button } from 'primereact/button';
import { useNavigate, useNavigation } from 'react-router-dom';

export default function Header() {
    const menuRef = useRef(null);
const navigate = useNavigate()
    const items = [
        {
            label: 'Options',
            items: [
                {
                    label: 'Setting',
                    icon: 'pi pi-cog',
                    command: () => console.log("Refresh Clicked")
                },
                {
                    label: 'Log out',
                    icon: 'pi pi-sign-out ',
                    command: () => navigate('/')
                }
            ]
        }
    ];

    return (
        <div className="flex justify-end py-5 bg-primary border-b sticky z-50 px-10 gap-5 top-0 ">
            <Menu model={items} popup ref={menuRef} id="popup_menu_left" />
            <i 
            className="pi pi-moon text-lg cursor-pointer" />
            <div className='flex gap-3 items-center'  onClick={(event) => menuRef.current.toggle(event)} >
            <i 
            className="pi pi-user text-lg cursor-pointer" 
            aria-controls="popup_menu_left" 
            aria-haspopup   
            />
            </div>
        </div>
    );
}

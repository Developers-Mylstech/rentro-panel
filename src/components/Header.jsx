import React, { useRef } from 'react';
import { Menu } from 'primereact/menu';
import { Button } from 'primereact/button';

export default function Header() {
    const menuRef = useRef(null);

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
                    command: () => console.log("Export Clicked")
                }
            ]
        }
    ];

    return (
        <div className="flex justify-end py-5 bg-primary border-b px-10 gap-5 sticky top-0">
            <Menu model={items} popup ref={menuRef} id="popup_menu_left" />
            <i 
            className="pi pi-moon text-lg cursor-pointer" />
            <i 
            className="pi pi-user text-lg cursor-pointer" 
            onClick={(event) => menuRef.current.toggle(event)} 
            aria-controls="popup_menu_left" 
            
            aria-haspopup 
            />
        </div>
    );
}





// import React from 'react'; 
// import { Menubar } from 'primereact/menubar';

// export default function BasicDemo() {
//     const items = [
//         {
//             label: 'Mode',
//             icon: 'pi pi-moon',
//             items: [
//                 {
//                     label: 'Components',
//                     icon: 'pi pi-bolt'
//                 },
//                 {
//                     label: 'Blocks',
//                     icon: 'pi pi-server'
//                 },
                
//             ]
//         },
        
//         {
//             label: 'Profile',
//             icon: 'pi pi-user',
//             items: [
//                 {
//                     label: 'Setting',
//                     icon: 'pi pi-cog'
//                 },
//                 {
//                     label: 'Log Out',
//                     icon: 'pi pi-sign-out'
//                 },
                
//             ]
//         },
        
//     ];

//     return (
//         <div className="card flex justify-end py-3 border-b">
//             <Menubar model={items} />
//         </div>
//     )
// }
        
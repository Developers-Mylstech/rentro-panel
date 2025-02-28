import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import CustomButton from '../../systemdesign/CustomeButton';
import { useNavigate } from "react-router-dom";

export default function AboutusListing() {
    const [search, setSearch] = useState('');
    const [entries, setEntries] = useState(10);

    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/about/add');
    };

    const aboutUsData = [
        {
            image: 'http://panelro.xpertspot.com/assets/images/product/1.png',
            title: 'WHO WE ARE',
            subtitle: 'GET TO KNOW RENT RO',
        }
    ];

    const filteredData = aboutUsData.filter(item =>
        item.title.toLowerCase().includes(search.toLowerCase())
    );

    const imageTemplate = (rowData) => (
        <img
            src={rowData.image}
            alt={rowData.title}
            className="w-20 h-20 object-cover"
        />
    );

    const optionTemplate = () => (
        <div className="flex justify-start gap-2">
            <Button icon="pi pi-pencil" className="p-button-rounded p-button-text p-button-info text-blue-600" />
            <Button icon="pi pi-trash" className="p-button-rounded p-button-text p-button-danger text-red-600" />
        </div>
    );

    return (
        <div className="">


            <div className="flex justify-between mb-4">
                <div className='flex justify-between items-center'>
                    <h2 className="heading">About Us List</h2>
                </div>

                <div className="flex items-center gap-2">
                    <InputText
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by title"
                        className='border px-2 py-1 text-black'
                    />
                    <CustomButton title="Add New" onClick={handleNavigate} icon={'pi pi-plus'} />
                </div>

            </div>

            <DataTable value={filteredData} stripedRows paginator rows={10} responsiveLayout="scroll">
                <Column
                    field="image"
                    header="About Us Image"
                    headerClassName="bg-secondary  text-primary "
                    body={imageTemplate}
                />
                <Column
                    field="title"
                    header="Title"
                    headerClassName="bg-secondary  text-primary "
                />
                <Column
                    field="subtitle"
                    header="Subtitle"
                    headerClassName="bg-secondary text-primary "
                />
                <Column
                    header="Option"
                    body={optionTemplate}
                    headerClassName="bg-secondary  text-primary "
                />
            </DataTable>
        </div>
    );
}

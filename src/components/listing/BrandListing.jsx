import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import CustomButton from "../../systemdesign/CustomeButton";
import { useNavigate } from "react-router-dom";

export default function BrandListing({ brands }) {
    const [search, setSearch] = useState("");
    const [visible, setVisible] = useState(false);
    const navigate = useNavigate()

    const filteredBrands = brands.filter((brand) =>
        brand.name.toLowerCase().includes(search.toLowerCase())
    );

    const imageTemplate = (rowData) => (
        <img
            src={rowData.image}
            alt={rowData.name}
            className="w-20 h-12 object-contain flex justify-center"
        />
    );

    const actionsTemplate = () => (
        <div className="flex gap-2">
            <Button
                icon="pi pi-pencil"
                className="p-button-text p-button-sm text-blue-500 focus:ring-0 focus:outline-none focus:border-transparent"
            />
            <Button
                icon="pi pi-trash"
                onClick={() => setVisible(true)}
                className="p-button-text p-button-sm text-red-500 focus:ring-0 focus:outline-none focus:border-transparent"
            />
        </div>
    );

    return (
        <div>
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                <h1 className="heading text-lg md:text-xl lg:text-2xl font-bold mb-3 md:mb-0">
                    Brand List
                </h1>

                <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                    <IconField
                        iconPosition="right"
                        className="border rounded w-full sm:w-60"
                    >
                        <InputIcon className="pi pi-search"></InputIcon>
                        <InputText
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search..."
                            className="p-inputtext-sm focus:ring-0 focus:outline-none focus:border-transparent w-full p-2 rounded-full"
                        />
                    </IconField>

                    <CustomButton
                        title="Add Brand"
                        icon="pi pi-plus"
                        onClick={() => navigate("/brands/add")}
                        className="w-full sm:w-auto sm:ml-3"
                    />
                </div>


            </div>

            <DataTable
                value={filteredBrands}
                paginator
                rows={5}
                stripedRows
                className="border border-gray-300 rounded-md bg"
            >
                <Column
                    field="image"
                    header="Brand Image"
                    body={imageTemplate}
                    headerClassName="bg-secondary border-r text-white"
                />
                <Column
                    field="name"
                    header="Brand Name"
                    headerClassName="bg-secondary border-r text-white text-center"
                    className="font-semibold text-gray-700"
                />
                <Column
                    header="Option"
                    body={actionsTemplate}
                    headerClassName="bg-secondary text-white"
                />
            </DataTable>

            <Dialog
                header="Confirmation"
                position="top"
                draggable={false}
                visible={visible}
                onHide={() => setVisible(false)}
            >
                <p className="mb-10">Do you want to delete this field?</p>
                <div className="flex justify-between">
                    <CustomButton title={"Yes"} icon={"pi pi-check"} />
                    <CustomButton title={"No"} icon={"pi pi-times"} />
                </div>
            </Dialog>
        </div>
    );
}

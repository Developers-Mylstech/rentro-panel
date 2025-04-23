import React, { useState, useEffect } from 'react';
import { MultiSelect } from 'primereact/multiselect';
import { FiPlus } from 'react-icons/fi';
import { IoMdSave } from 'react-icons/io';
import useSpecificationFieldsStore from '../../Context/SpecificationFieldsContext.js';

const SpecificationFields = ({ specs, onChange }) => {
  const { specificationFields, getAllSpecificationFields } = useSpecificationFieldsStore();
  
  const [selectedSpecification, setSelectedSpecification] = useState([]);
  const [customFields, setCustomFields] = useState([]);
  const [showNewFieldInput, setShowNewFieldInput] = useState(false);
  const [newFieldName, setNewFieldName] = useState('');

  useEffect(() => {
    getAllSpecificationFields();
  }, []);

  const handleAddNewField = () => {
    if (!newFieldName.trim()) return;

    const newSpec = {
      specificationFieldId: Date.now(),
      name: newFieldName.trim()
    };

    setSelectedSpecification(prev => [...prev, newSpec]);
    setCustomFields(prev => [
      ...prev,
      { specificationFieldId: newSpec.specificationFieldId, name: newSpec.name, value: '' }
    ]);

    setNewFieldName('');
    setShowNewFieldInput(false);
  };

  useEffect(() => {
    if (onChange) {
      const formattedFields = customFields.map(f => ({
        name: f.name,
        value: f.value
      }));
      onChange('specifications', null, formattedFields);
    }
  }, [customFields]);

  const handleSpecificationChange = (selectedValues) => {
    setSelectedSpecification(selectedValues);
    const existingFieldsMap = customFields.reduce((acc, field) => {
      acc[field.specificationFieldId] = field;
      return acc;
    }, {});
    const updatedFields = selectedValues.map(spec => (
      existingFieldsMap[spec.specificationFieldId] || {
        specificationFieldId: spec.specificationFieldId,
        name: spec.name,
        value: ''
      }
    ));
    setCustomFields(updatedFields);
  };

  const handleCustomFieldChange = (specificationFieldId, value) => {
    setCustomFields(prev => 
      prev.map(field => 
        field.specificationFieldId === specificationFieldId 
          ? { ...field, value } 
          : field
      )
    );
  };

  return (
    <div className="flex flex-col gap-6 w-full text-gray-800 dark:text-gray-200">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full gap-4">
        <label className="font-semibold text-gray-700 dark:text-gray-300 text-left w-full md:w-auto">
          Specifications
        </label>

        <div className="flex flex-col md:flex-row gap-3 md:w-[70%] w-full">
          <MultiSelect
            value={selectedSpecification}
            onChange={(e) => handleSpecificationChange(e.value)}
            options={specificationFields}
            optionLabel="name"
            filter
            placeholder="Select Specifications"
            className="w-full md:w-[60%] border dark:bg-gray-800 dark:text-white dark:border-gray-600"
          />

          {!showNewFieldInput ? (
            <button
              type="button"
              onClick={() => setShowNewFieldInput(true)}
              className="flex justify-center items-center p-2 bg-secondary text-white rounded-md hover:bg-secondary/90 transition"
            >
              <FiPlus className="text-2xl" />
            </button>
          ) : (
            <div className="flex gap-2 w-full md:w-[40%]">
              <input
                type="text"
                value={newFieldName}
                onChange={(e) => setNewFieldName(e.target.value)}
                className="p-2 border rounded-md w-full dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                placeholder="New specification name"
              />
              <button
                type="button"
                onClick={handleAddNewField}
                className="bg-green-600 text-white p-2 rounded-md hover:bg-green-700 transition"
              >
                <IoMdSave />
              </button>
            </div>
          )}
        </div>
      </div>

      {customFields.length > 0 && (
        <div className="flex flex-col gap-4 w-full mt-4">
          {customFields.map((field) => (
            <div
              key={field.specificationFieldId}
              className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2"
            >
              <label className="font-medium text-gray-600 dark:text-gray-300">
                {field.name}
              </label>
              <input
                type="text"
                value={field.value}
                onChange={(e) =>
                  handleCustomFieldChange(field.specificationFieldId, e.target.value)
                }
                className="w-full md:w-[70%] p-2 border rounded-md dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                placeholder={`Enter ${field.name} value`}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SpecificationFields;

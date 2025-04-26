import React, { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';

const TagsAndKeywords = ({ tags = [], onChange }) => {
    const [keywords, setKeywords] = useState(tags.length > 0 ? tags : ['']);

    useEffect(() => {
        if (keywords.length === 0) {
            setKeywords(['']);
        }
    }, []);

    useEffect(() => {
        const nonEmptyKeywords = keywords.filter(keyword => keyword.trim() !== '');
        onChange('tags', null, nonEmptyKeywords);
    }, [keywords]);

    const handleKeywordChange = (index, value) => {
        const updatedKeywords = [...keywords];
        updatedKeywords[index] = value;
        setKeywords(updatedKeywords);
    };

    const addKeyword = () => {
        setKeywords([...keywords, '']);
    };

    const removeKeyword = (index) => {
        if (keywords.length <= 1) {
            // If it's the last keyword, just clear it instead of removing
            const updatedKeywords = [...keywords];
            updatedKeywords[index] = '';
            setKeywords(updatedKeywords);
        } else {
            const updatedKeywords = keywords.filter((_, i) => i !== index);
            setKeywords(updatedKeywords);
        }
    };

    return (
        <div className="border p-6 rounded-lg shadow bg-white mb-6 dark:bg-gray-800">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold dark:text-gray-100">Tags & Keywords</h2>
                <button
                    type="button"
                    onClick={addKeyword}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                    Add Tag
                </button>
            </div>

            <div className="space-y-4">
                {keywords.map((keyword, index) => (
                    <div key={index} className="flex items-start gap-3 group">
                        <div className="flex-1 relative">
                            <InputText
                                value={keyword}
                                onChange={(e) => handleKeywordChange(index, e.target.value)}
                                placeholder={`Enter tag/keyword #${index + 1}...`}
                                className="w-full"
                            />
                        </div>
                        <button
                            type="button"
                            onClick={() => removeKeyword(index)}
                            className="text-red-500 hover:text-red-700 transition-colors"
                        >
                            Remove
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TagsAndKeywords;
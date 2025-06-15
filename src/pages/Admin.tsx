
import React, { useState, useEffect } from 'react';
import carsData from '../data/cars.json';
import filtersData from '../data/filters.json';
import { Textarea } from '@/components/ui/textarea';
import { Download } from 'lucide-react';

const datasets = {
    cars: carsData,
    filters: filtersData,
};

type DatasetKey = keyof typeof datasets;

const Admin = () => {
    const [selectedDataset, setSelectedDataset] = useState<DatasetKey>('cars');
    const [jsonData, setJsonData] = useState('');

    useEffect(() => {
        setJsonData(JSON.stringify(datasets[selectedDataset], null, 2));
    }, [selectedDataset]);

    const handleDownload = () => {
        const blob = new Blob([jsonData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${selectedDataset}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="container py-5">
            <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
                <h1 className="fw-bold mb-0">Manage Application Data</h1>
                <div className="d-flex align-items-center gap-3">
                    <select 
                        className="form-select w-auto" 
                        value={selectedDataset} 
                        onChange={(e) => setSelectedDataset(e.target.value as DatasetKey)}
                    >
                        <option value="cars">Car Data (cars.json)</option>
                        <option value="filters">Filter Data (filters.json)</option>
                    </select>
                    <button className="btn btn-primary d-flex align-items-center gap-2" onClick={handleDownload}>
                        <Download size={18} />
                        Download JSON
                    </button>
                </div>
            </div>
            <div className="alert alert-info" role="alert">
                <h4 className="alert-heading">How to save your changes</h4>
                <p>
                    Select a dataset, then edit the content in the text area below. When you are finished, click the <strong>Download JSON</strong> button to save a copy of the updated data to your computer.
                </p>
                <hr />
                <p className="mb-0">
                    <strong>Important:</strong> To make these changes live on the website, you must manually replace the corresponding <code>.json</code> file in the <code>src/data/</code> directory with your newly downloaded file. Saving directly from the browser is not supported in this setup.
                </p>
            </div>
            <Textarea
                value={jsonData}
                onChange={(e) => setJsonData(e.target.value)}
                className="font-monospace mt-4"
                style={{ height: '60vh' }}
                placeholder="Loading data..."
            />
        </div>
    );
};

export default Admin;

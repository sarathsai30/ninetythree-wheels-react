import React, { useState, useEffect } from 'react';
import carsData from '../data/cars.json';
import filtersData from '../data/filters.json';
import blogsData from '../data/blogs.json';
import { Textarea } from '@/components/ui/textarea';
import { Download } from 'lucide-react';
import BlogAdmin from '../components/BlogAdmin';
import VideoAdmin from '../components/VideoAdmin';
import YoutubeAdmin from './YoutubeAdmin'; 
import { useAdmin } from '../hooks/useAdmin';

const datasets = {
    cars: carsData,
    filters: filtersData,
    blogs: blogsData,
};

type DatasetKey = keyof typeof datasets;

const Admin = () => {
    const [selectedDataset, setSelectedDataset] = useState<DatasetKey>('cars');
    const [jsonData, setJsonData] = useState('');
    const [activeTab, setActiveTab] = useState('data');
    const [adminPassword, setAdminPassword] = useState('');
    const { isAdmin, login, logout } = useAdmin();

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

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (login(adminPassword)) {
            setAdminPassword('');
        } else {
            alert('Invalid password');
        }
    };

    if (!isAdmin) {
        return (
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-body">
                                <h3 className="text-center mb-4">Admin Login</h3>
                                <form onSubmit={handleLogin}>
                                    <div className="mb-3">
                                        <label className="form-label">Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            value={adminPassword}
                                            onChange={(e) => setAdminPassword(e.target.value)}
                                            placeholder="Enter admin password"
                                            required
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary w-100">
                                        Login
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container-fluid py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="fw-bold mb-0">Admin Dashboard</h1>
                <button className="btn btn-outline-danger" onClick={logout}>
                    Logout
                </button>
            </div>

            {/* Navigation Tabs */}
            <ul className="nav nav-tabs mb-4">
                <li className="nav-item">
                    <button 
                        className={`nav-link ${activeTab === 'data' ? 'active' : ''}`}
                        onClick={() => setActiveTab('data')}
                    >
                        Data Management
                    </button>
                </li>
                <li className="nav-item">
                    <button 
                        className={`nav-link ${activeTab === 'blog' ? 'active' : ''}`}
                        onClick={() => setActiveTab('blog')}
                    >
                        Blog Management
                    </button>
                </li>
                <li className="nav-item">
                    <button 
                        className={`nav-link ${activeTab === 'video' ? 'active' : ''}`}
                        onClick={() => setActiveTab('video')}
                    >
                        Video Management
                    </button>
                </li>
                <li className="nav-item">
                    <button 
                        className={`nav-link ${activeTab === 'youtube' ? 'active' : ''}`}
                        onClick={() => setActiveTab('youtube')}
                    >
                        YouTube Videos
                    </button>
                </li>
            </ul>

            {/* Tab Content */}
            {activeTab === 'data' && (
                <div>
                    <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
                        <h2 className="fw-bold mb-0">Manage Application Data</h2>
                        <div className="d-flex align-items-center gap-3">
                            <select 
                                className="form-select w-auto" 
                                value={selectedDataset} 
                                onChange={(e) => setSelectedDataset(e.target.value as DatasetKey)}
                            >
                                <option value="cars">Car Data (cars.json)</option>
                                <option value="filters">Filter Data (filters.json)</option>
                                <option value="blogs">Blog Data (blogs.json)</option>
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
            )}

            {activeTab === 'blog' && <BlogAdmin />}

            {activeTab === 'video' && <VideoAdmin />}

            {activeTab === 'youtube' && <YoutubeAdmin />} {/* 👈 New tab content */}
        </div>
    );
};

export default Admin;

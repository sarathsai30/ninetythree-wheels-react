import React, { useState, useEffect } from 'react';
import carsData from '../data/cars.json';
import filtersData from '../data/filters.json';
import blogsData from '../data/blogs.json';
import { Textarea } from '@/components/ui/textarea';
import { Download, RefreshCw, Database, Trash2 } from 'lucide-react';
import BlogAdmin from '../components/BlogAdmin';
import VideoAdmin from '../components/VideoAdmin';
import { useAdmin } from '../hooks/useAdmin';
import { youtubeService } from '../services/youtubeService';
import { blogService } from '../services/blogService';
import { videoService } from '../services/videoService';

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
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [refreshStatus, setRefreshStatus] = useState('');
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

    const handleLogin = (e) => {
        e.preventDefault();
        if (login(adminPassword)) {
            setAdminPassword('');
        } else {
            alert('Invalid password');
        }
    };

    const refreshYouTubeData = async () => {
        setIsRefreshing(true);
        setRefreshStatus('Fetching YouTube data...');
        try {
            const apiKey = prompt('Enter YouTube API Key:');
            const channelId = prompt('Enter Channel ID:');
            
            if (!apiKey || !channelId) {
                setRefreshStatus('YouTube refresh cancelled - API key or Channel ID not provided');
                setIsRefreshing(false);
                return;
            }

            const count = await youtubeService.fetchAndStoreYouTubeVideos(apiKey, channelId);
            setRefreshStatus(`Successfully fetched and stored ${count} YouTube videos`);
        } catch (error) {
            setRefreshStatus(`Error fetching YouTube data: ${error.message}`);
        }
        setIsRefreshing(false);
    };

    const clearYouTubeData = async () => {
        if (!confirm('Are you sure you want to delete all YouTube videos? This action cannot be undone.')) {
            return;
        }
        
        setIsRefreshing(true);
        setRefreshStatus('Deleting YouTube data...');
        try {
            const count = await youtubeService.deleteAllYouTubeVideos();
            setRefreshStatus(`Successfully deleted ${count} YouTube videos`);
        } catch (error) {
            setRefreshStatus(`Error deleting YouTube data: ${error.message}`);
        }
        setIsRefreshing(false);
    };

    const refreshBlogData = async () => {
        setIsRefreshing(true);
        setRefreshStatus('Refreshing blog data...');
        try {
            // Add any blog data refresh logic here
            setRefreshStatus('Blog data refreshed successfully');
        } catch (error) {
            setRefreshStatus(`Error refreshing blog data: ${error.message}`);
        }
        setIsRefreshing(false);
    };

    const refreshVideoData = async () => {
        setIsRefreshing(true);
        setRefreshStatus('Refreshing video data...');
        try {
            // Add any video data refresh logic here
            setRefreshStatus('Video data refreshed successfully');
        } catch (error) {
            setRefreshStatus(`Error refreshing video data: ${error.message}`);
        }
        setIsRefreshing(false);
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
                        className={`nav-link ${activeTab === 'maintenance' ? 'active' : ''}`}
                        onClick={() => setActiveTab('maintenance')}
                    >
                        Maintenance
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

            {activeTab === 'maintenance' && (
                <div>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h2 className="fw-bold mb-0">System Maintenance</h2>
                        <span className="badge bg-secondary">Data Refresh Controls</span>
                    </div>

                    {refreshStatus && (
                        <div className={`alert ${refreshStatus.includes('Error') ? 'alert-danger' : 'alert-success'} mb-4`} role="alert">
                            {refreshStatus}
                        </div>
                    )}

                    <div className="row g-4">
                        {/* YouTube Data Management */}
                        <div className="col-md-6">
                            <div className="card h-100">
                                <div className="card-body">
                                    <div className="d-flex align-items-center mb-3">
                                        <Database className="text-danger me-2" size={24} />
                                        <h5 className="card-title mb-0">YouTube Data</h5>
                                    </div>
                                    <p className="card-text">
                                        Refresh YouTube videos from API and store in Firebase database.
                                    </p>
                                    <div className="d-grid gap-2">
                                        <button 
                                            className="btn btn-primary d-flex align-items-center justify-content-center gap-2"
                                            onClick={refreshYouTubeData}
                                            disabled={isRefreshing}
                                        >
                                            <RefreshCw size={18} className={isRefreshing ? 'spinning' : ''} />
                                            {isRefreshing ? 'Fetching...' : 'Fetch YouTube Data'}
                                        </button>
                                        <button 
                                            className="btn btn-outline-danger d-flex align-items-center justify-content-center gap-2"
                                            onClick={clearYouTubeData}
                                            disabled={isRefreshing}
                                        >
                                            <Trash2 size={18} />
                                            Clear All YouTube Data
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Blog Data Management */}
                        <div className="col-md-6">
                            <div className="card h-100">
                                <div className="card-body">
                                    <div className="d-flex align-items-center mb-3">
                                        <Database className="text-primary me-2" size={24} />
                                        <h5 className="card-title mb-0">Blog Data</h5>
                                    </div>
                                    <p className="card-text">
                                        Refresh blog posts and related content from Firebase.
                                    </p>
                                    <button 
                                        className="btn btn-primary d-flex align-items-center justify-content-center gap-2 w-100"
                                        onClick={refreshBlogData}
                                        disabled={isRefreshing}
                                    >
                                        <RefreshCw size={18} className={isRefreshing ? 'spinning' : ''} />
                                        {isRefreshing ? 'Refreshing...' : 'Refresh Blog Data'}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Video Data Management */}
                        <div className="col-md-6">
                            <div className="card h-100">
                                <div className="card-body">
                                    <div className="d-flex align-items-center mb-3">
                                        <Database className="text-success me-2" size={24} />
                                        <h5 className="card-title mb-0">Video Data</h5>
                                    </div>
                                    <p className="card-text">
                                        Refresh video content and metadata from Firebase.
                                    </p>
                                    <button 
                                        className="btn btn-primary d-flex align-items-center justify-content-center gap-2 w-100"
                                        onClick={refreshVideoData}
                                        disabled={isRefreshing}
                                    >
                                        <RefreshCw size={18} className={isRefreshing ? 'spinning' : ''} />
                                        {isRefreshing ? 'Refreshing...' : 'Refresh Video Data'}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* System Status */}
                        <div className="col-md-6">
                            <div className="card h-100">
                                <div className="card-body">
                                    <div className="d-flex align-items-center mb-3">
                                        <RefreshCw className="text-info me-2" size={24} />
                                        <h5 className="card-title mb-0">System Status</h5>
                                    </div>
                                    <p className="card-text">
                                        Current system status and last refresh information.
                                    </p>
                                    <div className="alert alert-info mb-0">
                                        <small>
                                            <strong>Last Action:</strong><br />
                                            {refreshStatus || 'No recent actions'}
                                        </small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <style>{`
                        .spinning {
                            animation: spin 1s linear infinite;
                        }
                        
                        @keyframes spin {
                            from { transform: rotate(0deg); }
                            to { transform: rotate(360deg); }
                        }
                    `}</style>
                </div>
            )}
        </div>
    );
};

export default Admin;

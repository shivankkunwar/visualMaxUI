import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BarChart from './BarChart';
import LineChart from './LineChart'; // Ensure this imports the updated line chart
import { fetchData } from '../services/api';
import useUrlParams from '../hooks/useUrlParams';
import { DataPoint, Filters } from '../types';
const Dashboard: React.FC = () => {
  const [data, setData] = useState<DataPoint[]>([]);
  const [filters, setFilters] = useState<Filters>({
    startDate: '',
    endDate: '',
    ageFilter: 'all',
    genderFilter: 'all'
  });
  const [lineChartData, setLineChartData] = useState<{ date: string; value: number }[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const navigate = useNavigate();
  const { setUrlParams, getUrlParams } = useUrlParams();

  useEffect(() => {
    const params = getUrlParams();
    const storedFilters = JSON.parse(localStorage.getItem('dashboardFilters') || '{}');
    
    setFilters({
      startDate: storedFilters.startDate || params.startDate || '',
      endDate: storedFilters.endDate || params.endDate || '',
      ageFilter: storedFilters.ageFilter || params.age || 'all',
      genderFilter: storedFilters.genderFilter || params.gender || 'all'
    });

    setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      fetchDataAndUpdate();
      saveFiltersToLocalStorage();
      updateURL();
    }
  }, [filters, isLoggedIn]);

  const fetchDataAndUpdate = async () => {
    try {
      const result = await fetchData(filters);
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchLineChartData = async (feature: string) => {
    try {
      const response = await fetch(`${ import.meta.env.VITE_API_BASE_URL}/data/feature-trend`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ feature, startDate: filters.startDate, endDate: filters.endDate })
      });
      const result = await response.json();
      setLineChartData(result);
    } catch (error) {
      console.error('Error fetching line chart data:', error);
    }
  };

  const saveFiltersToLocalStorage = () => {
    localStorage.setItem('dashboardFilters', JSON.stringify(filters));
  };

  const updateURL = () => {
    setUrlParams({
      startDate: filters.startDate,
      endDate: filters.endDate,
      age: filters.ageFilter,
      gender: filters.genderFilter
    });
  };

  const handleFilterChange = (key: keyof Filters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

  if (!isLoggedIn) {
    navigate('/login');
    return null;
  }

  return (
    <div className="dashboard">
      <h1>Product Analytics Dashboard</h1>
      <button onClick={handleLogout} className="logout-btn">Logout</button>
      
      <div className="filters">
        <input
          type="date"
          value={filters.startDate}
          onChange={(e) => handleFilterChange('startDate', e.target.value)}
        />
        <input
          type="date"
          value={filters.endDate}
          onChange={(e) => handleFilterChange('endDate', e.target.value)}
        />
        <select
          value={filters.ageFilter}
          onChange={(e) => handleFilterChange('ageFilter', e.target.value)}
        >
          <option value="all">All Ages</option>
          <option value="15-25">15-25</option>
          <option value=">25">&gt;25</option>
        </select>
        <select
          value={filters.genderFilter}
          onChange={(e) => handleFilterChange('genderFilter', e.target.value)}
        >
          <option value="all">All Genders</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>

      <BarChart data={data} onBarClick={(feature) => { 
        fetchLineChartData(feature); 
      }} />
      
      {lineChartData.length > 0 && (
        <LineChart data={lineChartData} />
      )}

      <div className="share-url">
        <p>Share this view:</p>
        <input type="text" readOnly value={window.location.href} />
      </div>
    </div>
  );
};

export default Dashboard;
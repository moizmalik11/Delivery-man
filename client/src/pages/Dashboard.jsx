import { useState, useEffect } from 'react';
import axios from 'axios';
import MapView from '../components/MapView';
import DeliveryList from '../components/DeliveryList';
import StatusBadge from '../components/StatusBadge';

const Dashboard = ({ socket }) => {
  const [deliveries, setDeliveries] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    delivered: 0
  });

  useEffect(() => {
    fetchDeliveries();
    
    if (socket) {
      socket.on('delivery_updated', (delivery) => {
        setDeliveries(prev => prev.map(d => 
          d._id === delivery._id ? delivery : d
        ));
        updateStats();
      });
      
      socket.on('delivery_deleted', (id) => {
        setDeliveries(prev => prev.filter(d => d._id !== id));
        updateStats();
      });
    }

    return () => {
      if (socket) {
        socket.off('delivery_updated');
        socket.off('delivery_deleted');
      }
    };
  }, [socket]);

  const fetchDeliveries = async () => {
    try {
      const res = await axios.get('/api/deliveries');
      setDeliveries(res.data);
      updateStats(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const updateStats = (data = deliveries) => {
    const total = data.length;
    const pending = data.filter(d => d.status === 'pending').length;
    const delivered = data.filter(d => d.status === 'delivered').length;
    
    setStats({ total, pending, delivered });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500">Total Deliveries</h3>
          <p className="text-2xl font-bold">{stats.total}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500">Pending</h3>
          <p className="text-2xl font-bold">{stats.pending}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500">Delivered</h3>
          <p className="text-2xl font-bold">{stats.delivered}</p>
        </div>
      </div>
      
      {/* Map View */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Delivery Locations</h2>
        <MapView 
          location={{ lat: 51.505, lng: -0.09 }} // Default to London
          deliveries={deliveries.filter(d => d.location)}
        />
      </div>
      
      {/* Recent Deliveries */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Recent Deliveries</h2>
        <DeliveryList deliveries={deliveries.slice(0, 5)} />
      </div>
    </div>
  );
};

export default Dashboard;
import { useState, useEffect } from 'react';
import axios from 'axios';
import DeliveryList from '../components/DeliveryList';
import DeliveryForm from '../components/DeliveryForm';


const Deliveries = ({ socket }) => {
  const [deliveries, setDeliveries] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch deliveries
  const fetchDeliveries = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/deliveries');
      setDeliveries(res.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle new delivery submission
  const handleAddDelivery = async (deliveryData) => {
    try {
      await axios.post('/api/deliveries', deliveryData);
      setShowForm(false);
      fetchDeliveries(); // Refresh the list
    } catch (err) {
      setError(err.message);
    }
  };

  // Initialize socket listeners and fetch data
  useEffect(() => {
    fetchDeliveries();

    if (!socket) return;

    const onUpdate = (delivery) => {
      setDeliveries(prev => prev.map(d => d._id === delivery._id ? delivery : d));
    };

    const onDelete = (id) => {
      setDeliveries(prev => prev.filter(d => d._id !== id));
    };

    socket.on('delivery_updated', onUpdate);
    socket.on('delivery_deleted', onDelete);

    return () => {
      socket.off('delivery_updated', onUpdate);
      socket.off('delivery_deleted', onDelete);
    };
  }, [socket]);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Deliveries</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Delivery
        </button>
      </div>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
          {error}
        </div>
      )}

      {showForm && (
        <DeliveryForm 
          onSubmit={handleAddDelivery}
          onCancel={() => setShowForm(false)}
        />
      )}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <DeliveryList deliveries={deliveries} />
          {deliveries.length === 0 && (
            <p className="text-center py-8 text-gray-500">
              No deliveries found.
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default Deliveries;
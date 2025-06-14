import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import StatusBadge from '../components/StatusBadge';

const DeliveryDetail = ({ socket }) => {
  const { id } = useParams();
  const [delivery, setDelivery] = useState(null);

  useEffect(() => {
    const fetchDelivery = async () => {
      try {
        const res = await axios.get(`/api/deliveries/${id}`);
        setDelivery(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchDelivery();

    if (socket) {
      socket.on('delivery_updated', (updatedDelivery) => {
        if (updatedDelivery._id === id) {
          setDelivery(updatedDelivery);
        }
      });
    }

    return () => {
      if (socket) socket.off('delivery_updated');
    };
  }, [id, socket]);

  if (!delivery) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Delivery Details</h1>
      <div className="bg-white p-4 rounded shadow">
        <p><span className="font-semibold">Customer:</span> {delivery.customerName}</p>
        <p><span className="font-semibold">Address:</span> {delivery.deliveryAddress}</p>
        <p><span className="font-semibold">Status:</span> <StatusBadge status={delivery.status} /></p>
        {/* Add more details as needed */}
      </div>
    </div>
  );
};

export default DeliveryDetail;
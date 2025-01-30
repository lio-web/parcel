// import React, { useState, useEffect } from 'react';
// import axios from '../api/axios'; // Ensure you're using the correct Axios instance
// import { Link, useNavigate } from 'react-router-dom';

// function ViewOrders() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchOrders = async () => {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         setError('You are not authorized. Please log in.');
//         navigate('/login'); // Redirect to login if no token
//         return;
//       }

//       try {
//         const response = await axios.get('/user/parcels', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setOrders(response.data);
//       } catch (err) {
//         if (err.response?.status === 401) {
//           setError('Session expired. Please log in again.');
//           navigate('/login'); // Redirect to login if unauthorized
//         } else {
//           setError(err.response?.data?.message || 'Error fetching orders. Please try again.');
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, [navigate]);

//   return (
//     <div className="container mx-auto mt-10">
//       <h2 className="text-2xl font-bold mb-5">Your Orders</h2>
//       {loading ? (
//         <p className="text-gray-500">Loading orders...</p>
//       ) : error ? (
//         <p className="text-red-500">{error}</p>
//       ) : orders.length > 0 ? (
//         <table className="min-w-full bg-white border-collapse border border-gray-200">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="py-2 px-4 border">ID</th>
//               <th className="py-2 px-4 border">Pickup Location</th>
//               <th className="py-2 px-4 border">Destination</th>
//               <th className="py-2 px-4 border">Status</th>
//               <th className="py-2 px-4 border">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {orders.map((order) => (
//               <tr key={order.id} className="hover:bg-gray-50">
//                 <td className="py-2 px-4 border">{order.id}</td>
//                 <td className="py-2 px-4 border">{order.pickup_location}</td>
//                 <td className="py-2 px-4 border">{order.destination}</td>
//                 <td className="py-2 px-4 border">{order.status}</td>
//                 <td className="py-2 px-4 border">
//                   <Link to={`/update-order/${order.id}`} className="text-blue-500 hover:underline">
//                     Edit
//                   </Link>
//                   {' | '}
//                   <Link to={`/track-order/${order.id}`} className="text-blue-500 hover:underline">
//                     Track
//                   </Link>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p className="text-gray-500">No orders found.</p>
//       )}
//     </div>
//   );
// }

// export default ViewOrders;


import React, { useState, useEffect } from 'react';
import axios from '../api/axios'; // Ensure you're using the correct Axios instance
import { Link, useNavigate } from 'react-router-dom';

function ViewOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('You are not authorized. Please log in.');
        return navigate('/login'); // Redirect to login if no token
      }

      try {
        // Check if the current user is an admin
        const userResponse = await axios.get('/user/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setIsAdmin(userResponse.data.role === 'admin');

        const endpoint = userResponse.data.role === 'admin' ? '/admin/parcels' : '/user/parcels';
        const response = await axios.get(endpoint, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(response.data);
      } catch (err) {
        if (err.response?.status === 401) {
          setError('Session expired. Please log in again.');
          return navigate('/login'); // Redirect to login if unauthorized
        } else {
          setError(err.response?.data?.message || 'Error fetching orders. Please try again.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [navigate]);

  const handleSave = async (order) => {
    try {
      const response = await axios.put(`/user/parcels/${order.id}`, order, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      console.log(response.data);
      // Optionally, you can re-fetch orders to update the state
      setOrders((prevOrders) =>
        prevOrders.map((o) => (o.id === order.id ? response.data : o))
      );
      alert('Order updated successfully!');
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-5">{isAdmin ? 'All Orders' : 'Your Orders'}</h2>
      {loading ? (
        <p className="text-gray-500">Loading orders...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : orders.length > 0 ? (
        <table className="min-w-full bg-white border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border">ID</th>
              <th className="py-2 px-4 border">Pickup Location</th>
              <th className="py-2 px-4 border">Destination</th>
              <th className="py-2 px-4 border">Status</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border">{order.id}</td>
                <td className="py-2 px-4 border">
                  {order.status === 'pending' ? (
                    <input
                      type="text"
                      value={order.pickup_location}
                      onChange={(e) =>
                        setOrders((prevOrders) =>
                          prevOrders.map((o) =>
                            o.id === order.id ? { ...o, pickup_location: e.target.value } : o
                          )
                        )
                      }
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  ) : (
                    order.pickup_location
                  )}
                </td>
                <td className="py-2 px-4 border">
                  {order.status === 'pending' ? (
                    <input
                      type="text"
                      value={order.destination}
                      onChange={(e) =>
                        setOrders((prevOrders) =>
                          prevOrders.map((o) =>
                            o.id === order.id ? { ...o, destination: e.target.value } : o
                          )
                        )
                      }
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  ) : (
                    order.destination
                  )}
                </td>
                <td className="py-2 px-4 border">{order.status}</td>
                <td className="py-2 px-4 border">
                  {order.status === 'pending' ? (
                    <button
                      onClick={() => handleSave(order)}
                      className="text-blue-500 hover:underline"
                    >
                      Save
                    </button>
                  ) : (
                    <>
                      <Link to={`/update-order/${order.id}`} className="text-blue-500 hover:underline">
                        Edit
                      </Link>
                      {' | '}
                      <Link to={`/track-order/${order.id}`} className="text-blue-500 hover:underline">
                        Track
                      </Link>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500">No orders found.</p>
      )}
     

    </div>
  );
}

export default ViewOrders;

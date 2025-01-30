// // import React, { useState } from 'react';
// // import axiosInstance from '../api/axios';

// // function Login() {
// //   const [email, setEmail] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [error, setError] = useState('');

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const response = await axiosInstance.post('/auth/login', { email, password });
// //       localStorage.setItem('token', response.data.access_token);
// //       window.location.href = '/';
// //     } catch (err) {
// //       setError('Invalid credentials. Please try again.');
// //     }
// //   };

// //   return (
// //     <div className="container mx-auto">
// //       <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10">
// //         <h2 className="text-2xl font-bold mb-5">Login</h2>
// //         {error && <p className="text-red-500 mb-4">{error}</p>}
// //         <div className="mb-4">
// //           <label className="block text-sm font-medium">Email</label>
// //           <input
// //             type="email"
// //             value={email}
// //             onChange={(e) => setEmail(e.target.value)}
// //             className="w-full p-2 border border-gray-300 rounded"
// //           />
// //         </div>
// //         <div className="mb-4">
// //           <label className="block text-sm font-medium">Password</label>
// //           <input
// //             type="password"
// //             value={password}
// //             onChange={(e) => setPassword(e.target.value)}
// //             className="w-full p-2 border border-gray-300 rounded"
// //           />
// //         </div>
// //         <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
// //           Login
// //         </button>
// //       </form>
// //     </div>
// //   );
// // }

// // export default Login;




// import React, { useState } from 'react';
// import axios from '../api/axios';
// import { useNavigate } from 'react-router-dom';

// function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('/auth/login', { email, password });
//       localStorage.setItem('token', response.data.access_token);
//       localStorage.setItem('role', response.data.role);  // Store the user role
//       navigate('/');
//     } catch (err) {
//       setError('Error logging in. Please try again.');
//       console.error('Error logging in:', err);
//     }
//   };

//   return (
//     <div className="container mx-auto">
//       <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10">
//         <h2 className="text-2xl font-bold mb-5">Login</h2>
//         {error && <p className="text-red-500 mb-4">{error}</p>}
//         <div className="mb-4">
//           <label className="block text-sm font-medium">Email</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full p-2 border border-gray-300 rounded"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-sm font-medium">Password</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full p-2 border border-gray-300 rounded"
//           />
//         </div>
//         <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
//           Login
//         </button>
//       </form>
//     </div>
//   );
// }

// export default Login;


import React, { useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/auth/login', { email, password });
      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('name', response.data.name);
      localStorage.setItem('email', response.data.email);
      localStorage.setItem('role', response.data.role);
      navigate('/navbar');  
    } catch (err) {
      setError('Error logging in. Please try again.');
      console.error('Error logging in:', err);
    }
  };

  return (
    <div className="container mx-auto">
      <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10">
        <h2 className="text-2xl font-bold mb-5">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;

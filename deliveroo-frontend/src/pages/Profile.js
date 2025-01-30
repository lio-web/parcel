import React from 'react';

function Profile() {
  const name = localStorage.getItem('name');
  const email = localStorage.getItem('email');
  const role = localStorage.getItem('role');

  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-5">Profile</h2>
      <div className="bg-white p-5 rounded shadow-md">
        <p><strong>Name:</strong> {name}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Role:</strong> {role}</p>
      </div>
    </div>
  );
}

export default Profile;

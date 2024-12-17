import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Footer from './Footer';
import './UserManagement.css';

const UserManagement = () => {
  const [loggedUsers, setLoggedUsers] = useState([]);

  useEffect(() => {
    const auth = getAuth();
    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedUsers((prevUsers) => {
          const exists = prevUsers.some((u) => u.uid === user.uid);
          if (!exists) {
            return [...prevUsers, { uid: user.uid, email: user.email }];
          }
          return prevUsers;
        });
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h3>User Management</h3>

      <table border="1" style={{ width: '100%', marginTop: '20px' }}>
        <thead>
          <tr>
            <th>Identifier</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {loggedUsers.map((user, index) => (
            <tr key={index}>
              <td>{user.email.split('@')[0]}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Footer />
    </div>
  );
};

export default UserManagement;

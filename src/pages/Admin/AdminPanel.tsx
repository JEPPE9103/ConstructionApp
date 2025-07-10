import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { getCurrentUserWithRole } from '../../utils/auth';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 700px;
  margin: 40px auto;
  padding: 32px 24px;
  background: #f5f8ff;
  border-radius: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 24px;
`;

const UserList = styled.ul`
  margin-top: 24px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.07);
  padding: 16px;
`;

const UserItem = styled.li`
  padding: 10px 0;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &:last-child { border-bottom: none; }
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  margin-right: 8px;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  &:hover { background-color: #0056b3; }
`;

const Message = styled.div`
  margin-top: 16px;
  color: #dc3545;
`;

const AdminPanel: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      const currentUser = await getCurrentUserWithRole();
      if (!currentUser || currentUser.role !== 'admin') {
        setMessage('Du har inte behörighet att se denna sida.');
        setIsAdmin(false);
        setLoading(false);
        return;
      }
      setIsAdmin(true);
      const q = query(collection(db, 'users'), where('companyId', '==', currentUser.companyId));
      const snapshot = await getDocs(q);
      setUsers(snapshot.docs.map(doc => doc.data()));
      setLoading(false);
    };
    fetchUsers();
  }, []);

  const handleUpgrade = async () => {
    setMessage('');
    const userToUpgrade = users.find(u => u.email === email);
    if (!userToUpgrade) {
      setMessage('Ingen användare med den e-postadressen.');
      return;
    }
    try {
      await updateDoc(doc(db, 'users', userToUpgrade.uid), { role: 'admin' });
      setMessage('Användaren är nu admin!');
      setUsers(users.map(u => u.uid === userToUpgrade.uid ? { ...u, role: 'admin' } : u));
    } catch (err) {
      setMessage('Kunde inte uppgradera användaren.');
    }
  };

  if (loading) return <Container>Laddar...</Container>;
  if (!isAdmin) return <Container>{message}</Container>;

  return (
    <Container className="p-2 sm:p-4 md:p-8 max-w-xs sm:max-w-2xl mx-auto">
      <Title>Adminpanel</Title>
      <div style={{ marginBottom: 24 }}>
        <Input
          type="email"
          placeholder="Användarens e-post"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <Button onClick={handleUpgrade}>Gör till admin</Button>
      </div>
      {message && <Message>{message}</Message>}
      <h3 style={{ marginTop: 32, fontWeight: 600 }}>Användare i företaget:</h3>
      <UserList>
        {users.map(u => (
          <UserItem key={u.uid}>
            <span>{u.name} ({u.email})</span>
            <span style={{ fontWeight: 500, color: u.role === 'admin' ? '#007bff' : '#333' }}>{u.role}</span>
          </UserItem>
        ))}
      </UserList>
    </Container>
  );
};

export default AdminPanel; 
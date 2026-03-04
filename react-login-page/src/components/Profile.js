import React from 'react';
import { Container } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';

function Profile() {
  const { user } = useAuth();

  if (!user) {
    return (
      <Container>
        <h1>Profile</h1>
        <p>No hay usuario logueado</p>
      </Container>
    );
  }

  return (
    <Container>
      <h1>Profile</h1>
      <p>Welcome, {user.email}!</p>
    </Container>
  );
}

export default Profile;
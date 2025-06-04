import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../config/firebase';
import styled from 'styled-components';

const Nav = styled.nav`
  background-color: #fff;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const NavLink = styled(Link)`
  color: #333;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  
  &:hover {
    background-color: #f5f5f5;
  }
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  
  &:hover {
    background-color: #f5f5f5;
  }
`;

const Navigation: React.FC = () => {
  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <Nav>
      <NavContainer>
        <NavLinks>
          <NavLink to="/">Tidrapporter</NavLink>
          <NavLink to="/timereport">Ny tidrapport</NavLink>
        </NavLinks>
        <LogoutButton onClick={handleLogout}>Logga ut</LogoutButton>
      </NavContainer>
    </Nav>
  );
};

export default Navigation; 
import { Outlet } from 'react-router';

import { Link, Header } from './Navigation.styled';

const Navigation = () => {
  return (
    <Header>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/contacts">Contacts</Link>
        <Link to="/registration">Registration</Link>
        <Link to="/login">Login</Link>
      </nav>
      <Outlet />
    </Header>
  );
};

export default Navigation;

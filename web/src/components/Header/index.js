import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import logo from '~/assets/fastfeet-logo.png';

import { signOut } from '~/store/modules/auth/actions';

import { Container, Content, Profile, StyledLink } from './styles';

export default function Header() {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile);

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <nav>
          <Link to="/">
            <img src={logo} alt="Fastfeet" />
          </Link>
          <StyledLink to="/deliveries">ENCOMENDAS</StyledLink>
          <StyledLink to="/deliverymen">ENTREGADORES</StyledLink>
          <StyledLink to="/recipients">DESTINATÁRIOS</StyledLink>
          <StyledLink to="/problems">PROBLEMAS</StyledLink>
        </nav>

        <aside>
          <Profile>
            <div>
              <strong>{profile.name}</strong>
              <button type="button" onClick={handleSignOut}>sair do sistema</button>
            </div>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}

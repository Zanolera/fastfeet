import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import history from '~/services/history';

import logo from '~/assets/fastfeet-logo.png';

import { signOut } from '~/store/modules/auth/actions';

import { Container, Content, Profile, StyledLink } from './styles';

export default function Header() {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile);
  const currentPathname = history.location.pathname;

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
          <StyledLink
            to={{
              pathname: '/deliveries',
              selected: currentPathname.localeCompare('/deliveries') === 0,
            }}
          >
            ENCOMENDAS
          </StyledLink>
          <StyledLink
            to={{
              pathname: '/deliverymen',
              selected: currentPathname.localeCompare('/deliverymen') === 0,
            }}
          >
            ENTREGADORES
          </StyledLink>
          <StyledLink
            to={{
              pathname: '/recipients',
              selected: currentPathname.localeCompare('/recipients') === 0,
            }}
          >
            DESTINATÁRIOS
          </StyledLink>
          <StyledLink
            to={{
              pathname: '/problems',
              selected: currentPathname.localeCompare('/problems') === 0,
            }}
          >
            PROBLEMAS
          </StyledLink>
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

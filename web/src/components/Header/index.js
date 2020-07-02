import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

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
          <img src={logo} alt="Fastfeet" />
          <StyledLink to="/deliveries">ENCOMENDAS</StyledLink>
          <StyledLink to="/deliveries">ENTREGADORES</StyledLink>
          <StyledLink to="/deliveries">DESTINATÁRIOS</StyledLink>
          <StyledLink to="/deliveries">PROBLEMAS</StyledLink>
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

import React, { useContext } from 'react';
import { useNavigation } from '@react-navigation/native'
import { AuthContext } from '../../contexts/auth'

import Header from '../../components/Header';

import { Container, Nome, NewLink, NewText, Logout, LogoutText } from './styles';

export default function Profile() {

  const { user, signOut } = useContext(AuthContext);
  const navigation = useNavigation();

  return (
    <Container>
      <Header />
      <Nome>
        {user && user.nome}
      </Nome>
      <NewLink onPress={() => navigation.navigate('Registrar')}>
        <NewText>Registrar gastos</NewText>
      </NewLink>

      <Logout onPress={() => signOut()}>
        <LogoutText>Sair</LogoutText>
      </Logout>
    </Container>
  );
}

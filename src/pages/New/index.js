import React, { useState, useContext } from 'react';

import { SafeAreaView, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native';
import { Background, Input, SubmitButton, SubmitText } from './styles';
import Header from '../../components/Header';
import Picker from '../../components/Picker';
import { AuthContext } from '../../contexts/auth';

import firebase from '../../services/firebaseConnection';
import { format } from 'date-fns'
import { useNavigation } from '@react-navigation/native'


export default function New() {

  const navigation = useNavigation();

  const [valor, setValor] = useState('');
  const [tipo, setTipo] = useState(null);
  const { user: usuario } = useContext(AuthContext);

  function hendelSubmit() {
    
    Keyboard.dismiss();
    if (isNaN(parseFloat(valor)) || tipo === null) {
      alert('Preencha todos os campos!');
      return;
    }

    Alert.alert(
      'Confirmando dado',
      `Tipo ${tipo} - Valor: ${parseFloat(valor)}`,
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Continuar',
          onPress: () => handleAdd()
        }
      ]
    )
  }

  async function handleAdd() {
   
    let uid = usuario.uid;


    let key = await firebase.database().ref('historico').child(uid).push().key;
    await firebase.database().ref('historico').child(uid).child(key).set({
      tipo: tipo,
      valor: parseFloat(valor),
      date: format(new Date(), 'dd/MM/yyyy')
    })

   
    let user = firebase.database().ref('users').child(uid);
    await user.once('value').then((snapshot) => {
      let saldo = parseFloat(snapshot.val().saldo);

      tipo === 'despesa' ? saldo -= parseFloat(valor) : saldo += parseFloat(valor);

      user.child('saldo').set(saldo);
    });

    Keyboard.dismiss()
    setValor('')
    navigation.navigate('Home');

  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Background>
        <Header />
        
        <SafeAreaView style={{ alignItems: 'center' }}>
          <Input
            placeholder='Valor desejado'
            keyboardType='numeric'
            returnkeyType='next'
            onSubmitEditing={() => Keyboard.dismiss()}
            value={valor}
            onChangeText={(text) => setValor(text)}
          />

          <Picker onChange={setTipo} tipo={tipo} />
          
          <SubmitButton onPress={hendelSubmit}>
            <SubmitText> Registrar </SubmitText>
          </SubmitButton>

        </SafeAreaView>
      </Background>
    </TouchableWithoutFeedback>
  );
}
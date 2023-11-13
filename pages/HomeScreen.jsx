import {
  Button,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Input from '../components/Input';
import Mail from '../assets/mail.svg';
import Key from '../assets/key.svg';
import Person from '../assets/person.svg';
import React from 'react';
import axios from 'axios';

export default function HomeScreen({navigation}) {
  const [inputEmail, setInputEmail] = React.useState('');
  const [inputPassword, setInputPassword] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const BACKEND_URL = 'http://10.70.131.47:8080';
  let userName = React.useRef('');
  let btnDisabled = isLoading ? true : ((inputEmail == "") || (inputPassword == "")) ? true : false

  const changeEmailFunc = text => {
    // console.log(`Input email : ${text}`);
    setInputEmail(text);
  };
  const changePasswordFunc = text => {
    // console.log(`Input password : ${text}`);
    setInputPassword(text);
  };
  const submitLogin = async e => {
    console.log({userName: inputEmail, password: inputPassword})
    try {
      setIsLoading(true);
      let data = await axios.post(`${BACKEND_URL}/signin`, {
        username: inputEmail,
        password: inputPassword,
      });
      // console.log(['berhasil login => ', data.data]);
      // navigation.reset({
      //   index: 0,
      //   routes: [{ name: 'Profile' }],
      //   params: {user: "jimmy"}
      // });
      userName.current = inputEmail;
      navigation.navigate('Profile', {
        user: userName.current,
      });
    } catch (error) {
      Alert.alert('Username atau password tidak sesuai');
      console.log(['error login => ', error]);
    } finally {
      setIsLoading(false);
    }
  };

  let styles = StyleSheet.create({
    inputTextContainer: {
      gap: 8,
      height: 40,
      borderWidth: 1,
      padding: 10,
      borderColor: '#afbdcf',
      borderRadius: 8,
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      marginBottom: 16,
    },
    inputText: {
      height: 40,
      borderColor: '#141414',
      borderRadius: 8,
      paddingRight: 24,
      width: '100%',
    },
    inputLabel: {
      fontSize: 16,
      color: '#000000',
      marginBottom: 4,
    },
  });
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
        margin: 16,
        flexDirection: 'column',
      }}>
      {/* <Text style={styles.inputLabel}>Username</Text> */}
      <Input
        type="text"
        LeftIcon={Mail}
        placeholder="Input Username"
        value={inputEmail}
        onChangeText={text => changeEmailFunc(text)}
      />
      {/* <Text style={styles.inputLabel}>Password</Text> */}
      <Input
        type="password"
        LeftIcon={Key}
        RightIcon={Person}
        placeholder="Input Password"
        value={inputPassword}
        onChangeText={text => changePasswordFunc(text)}
      />
      <View style={{width: '100%', marginVertical: 8}}>
        <Button
          title="Login"
          onPress={e => submitLogin(e)}
          disabled={btnDisabled}
        />
      </View>
      {isLoading && (
        <ActivityIndicator size="large" style={{alignSelf: 'center'}} />
      )}
    </View>
  );
}

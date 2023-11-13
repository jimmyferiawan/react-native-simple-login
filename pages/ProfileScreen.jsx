import React from 'react';
import {View, Text} from 'react-native';
import axios from 'axios';

export default function ProfileScreen({route, navigation}) {
  const [profile, setProfile] = React.useState({});
  const BACKEND_URL = 'http://10.70.131.47:8080';
  const {user} = route.params
  let middlename = profile.middlename ? ` ${profile.middlename}` : ""
  let lastName = profile.lastName ? ` ${profile.lastname}` : ""
  let nama = `${profile.firstname}${middlename}${lastName}`
  React.useEffect(() => {
    console.log("profile => ", profile)
  }, [profile])

  React.useEffect(() => {
    
    // navigation.addListener('beforeRemove', e => {
    //   e.preventDefault();
    // });
    axios.get(`${BACKEND_URL}/u/${user}`)
      .then((data) => {
        console.log(data.data)
        setProfile(data.data.data)
      })
      .catch((err) => {
        console.log("error get user data => ", err)
      })
  }, [navigation]);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        margin: 16,
        flexDirection: 'column',
        flexGrow: 1,
      }}>
      <Text
        style={{
          fontSize: 16,
          color: '#000000',
          marginBottom: 4,
        }}>
        Nama : {nama}
      </Text>
      <Text
        style={{
          fontSize: 16,
          color: '#000000',
          marginBottom: 4,
        }}>
        Username : {profile.username}
      </Text>
      <Text
        style={{
          fontSize: 16,
          color: '#000000',
          marginBottom: 4,
        }}>
        Bio : {profile.intro ? profile.intro : ""}
      </Text>
      <Text
        style={{
          fontSize: 16,
          color: '#000000',
          marginBottom: 4,
        }}>
        Profile : {profile.profile ? profile.profile : ""}
      </Text>
    </View>
  );
}

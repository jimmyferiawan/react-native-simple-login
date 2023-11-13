import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Button,
  View,
  SafeAreaView,
  Text,
  TextInput,
  Modal,
  Pressable,
  ActivityIndicator,
} from 'react-native';

const styles = StyleSheet.create({
  input: {
    height: 40,
    // borderWidth: 0,
    // borderBottomWidth: 1,
    padding: 10,
    borderColor: '#2196F3',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    marginHorizontal: 16,
    marginTop: 12,
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    marginTop: 22,
  },
  modalView: {
    position: 'relative',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 2,
    padding: 20,
    paddingHorizontal: 10,
    alignItems: 'baseline',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
  },
  modalTextHeader: {
    alignSelf: 'center',
    marginBottom: 12,
    fontSize: 18,
    color: 'black',
  },
  modalText: {
    alignSelf: 'flex-start',
  },
  pressable: {
    position: 'absolute',
    right: 8,
    top: 6,
  },
  networking: {
    marginTop: 10,
  },
  networkingLoading: {
    alignSelf: 'center',
  },
});

const Separator = () => <View style={styles.separator} />;

const HomeScreenTodo = () => {
  const [text, setText] = React.useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [kata, setKata] = useState('');
  const [loading, setLoading] = useState(false);
  const nama = useRef('');

  useEffect(() => {
    console.log(`Input Text : ${text}`);
  }, [text]);

  const apiCall = async () => {
    setLoading(true);
    console.log('halo');
    try {
      const response = await fetch('https://api.quotable.io/quotes/random', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      });
      const json = await response.json();
      setKata(json[0].content);
      setModalVisible(!modalVisible);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            // Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Pressable
                onPress={() => setModalVisible(!modalVisible)}
                style={styles.pressable}>
                <Text style={styles.textStyle}>X</Text>
              </Pressable>
              <Text style={styles.modalTextHeader}>
                Hello {text}, kata-kata hari ini :{' '}
              </Text>
              <Text style={styles.modalText}>{kata}</Text>
            </View>
          </View>
        </Modal>
        <TextInput
          style={styles.input}
          onChangeText={e => setText(e)}
          onEndEditing={e => {
            console.log(`onEndEditing => ${e.target}`);
          }}
          value={text}
          placeholder="Siapa namamu ?"
          placeholderTextColor={'#737373'}
        />
        {/* <Separator /> */}
        <View style={styles.networking}>
          <Button
            title="Get random quotes"
            onPress={() => apiCall()}
            disabled={loading}
          />
          {loading && <ActivityIndicator style={styles.networkingLoading} />}
          <Separator />
        </View>
      </SafeAreaView>
    </NavigationContainer>
  );
};

export default HomeScreenTodo;

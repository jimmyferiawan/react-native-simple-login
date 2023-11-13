import React from 'react';
import {View, TextInput, Pressable} from 'react-native';
import Visibility from '../assets/visibility.svg';
import VisibilityOff from '../assets/visibility_off';

export default function Input({
  placeholder,
  LeftIcon,
  value,
  onChangeText,
  RightIcon,
  type,
}) {
  // [#2196F3, #afbdcf]
  const [borderOnFocus, setBorderOnFocus] = React.useState(false);
  const [text, setText] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(type === 'password')
  // let value1 = React.useRef(0);
  let changeText = value ? value : '';
  // console.log("re render : ", ++value1.current)

  const styles = {
    inputTextContainer: {
      // gap: 8,
      height: 40,
      // borderWidth: 1,
      // padding: 10,
      borderColor: borderOnFocus ? '#2196F3' : '#afbdcf',
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
      width: '100%',
      // marginLeft: 20,
      // marginRight: RightIcon ? 20 : 12,
      paddingRight: RightIcon ? 36 : 16,
      paddingLeft: LeftIcon ? 36 : 16,
      // flexGrow: 1,
      borderColor : borderOnFocus ? '#2196F3' : '#afbdcf',
    },
  };
  return (
    <View style={styles.inputTextContainer}>
      {LeftIcon && <LeftIcon width={12} height={12} style={{position: "absolute", left: 12}}/>}
      <TextInput
        style={{...styles.inputText, ...{borderBottomWidth: 1}}}
        inputMode={typeof type === 'string' ? (type === 'password' ? 'text' : type) : 'text'}
        placeholder={typeof placeholder === 'string' ? placeholder : ''}
        secureTextEntry={showPassword}
        onFocus={e => {
          setBorderOnFocus(true);
        }}
        onBlur={e => {
          setBorderOnFocus(false);
        }}
        onChangeText={text => {
          // console.log(`onChangeText() => ${text}`)
          if (onChangeText) {
            onChangeText(text);
          }
        }}
      />
      {RightIcon && 
        <Pressable 
          style={{position: "absolute", right: 12}}
          onPress={(e) => {
          console.log("toggle password")
          setShowPassword(!showPassword)
        }}>
          {showPassword ? <VisibilityOff width={12} height={12} /> : <Visibility width={12} height={12} />}
        </Pressable>
      }
    </View>
  );
}

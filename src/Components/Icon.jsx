import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Iconn({IconName}) {
  //   console.log(IconName);
  switch (IconName) {
    case 'circle':
      return <Icon name="circle-thin" size={38} color="red" />;
    //   break;
    case 'cross':
      return <Icon name="times" size={38} color="black" />;
    //   break;
    default:
      return <Icon name="pencil" size={38} color="orange" />;
  }
}

const styles = StyleSheet.create({});

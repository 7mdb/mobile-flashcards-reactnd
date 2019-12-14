import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform
} from "react-native";
import Colors from "../constants/Colors";

const CustomButton = ({ children, onPress, style = {}, disabled }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled === undefined ? false : true}
      style={[
        Platform.OS === "ios" ? styles.iosSubmitBtn : styles.androidSubmitBtn,
        { style },
        disabled === true ? styles.disabled : ""
      ]}
    >
      <Text style={styles.submitBtnText}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iosSubmitBtn: {
    backgroundColor: Colors.ButtonBG,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
    marginTop: 20,
    width: "90%",
    maxWidth: "90%",
    minWidth: "90%"
  },
  androidSubmitBtn: {
    backgroundColor: Colors.ButtonBG,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    width: "90%",
    maxWidth: "90%",
    minWidth: "90%"
  },
  submitBtnText: {
    color: Colors.textButton,
    fontSize: 22,
    textAlign: "center"
  },
  disabled: {
    opacity: 0.3
  }
});

export default CustomButton;

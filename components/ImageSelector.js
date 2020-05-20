import React, { useState } from "react";
import { Text, View, Button, StyleSheet, Image, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

import Colors from "../constants/Colors";

const ImgPicker = props => {
  const [pickedImage, setPickedImage] = useState();

  const verifyPermissions = async() => {
    const result = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
    if(result.status !== "granted") {
      Alert.alert("insufficient permission!", "you need to grant camera permissions to use this app", [{text:　"okay"}]);
      return false;
    }
    return true;
  };

  const takeImageHandler = async() => {
    const hasPermissions = await verifyPermissions();
    if(!hasPermissions) {
      return;
    }
    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16,9],
      quality: 0.5
    });

    setPickedImage(image.uri);
    props.onImageTaken(image.uri);
  };

  return(
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        {!pickedImage ? (
          <Text>No Image</Text>
        ) : (
        <Image style={styles.image} source={{uri:pickedImage}} />
        )}
      </View>
      <Button 
        color={Colors.primary} 
        title="Take Image" 
        onPress={takeImageHandler} 
      />
    </View>
  )
};

const styles = StyleSheet.create({
  imagePicker:{
    alignItems: "center",
    marginBottom: 15
  },
  imagePreview: {
    width: "100%",
    height: 200,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10
  },
  image: {
    width: "100%",
    height: "100%"
  }
});

export default ImgPicker;
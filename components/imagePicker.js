import React, { useState, useEffect } from 'react';
import { TouchableHighlight, Image, View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default ImageAndPicker = () => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TouchableHighlight
        onPress={pickImage}
      >       
        {image ? 
          <Image source={{ uri: image }} style={{ width: 50, height: 50 }} /> : 
          <Image source={require('../assets/contacts.png')} style={{ width: 50, height: 50 }} />
        }
      </TouchableHighlight>
    </View>
  );
}

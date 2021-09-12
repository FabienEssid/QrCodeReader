import React, { useState } from 'react';
import { Linking, StyleSheet, View } from 'react-native';
import { Div, Overlay, Text } from 'react-native-magnus';
import BarcodeMask from 'react-native-barcode-mask';
import { RNCamera } from 'react-native-camera';

const Home = ({ navigation }) => {
  console.log({ navigation });

  const [data, setData] = useState(null);

  const onLinkPressed = link => {
    Linking.openURL(link).catch(e =>
      console.error('An error occurred while trying to open the link', { e }),
    );
  };

  const cameraRef = React.useRef();
  const overlayRef = React.useRef();

  // Overlay methods
  const openOverlay = () => {
    if (overlayRef?.current) {
      overlayRef.current.open();
    }
  };

  const closeOverlay = () => {
    if (overlayRef?.current) {
      overlayRef.current.close();
    }
  };

  // React Native Camera methods
  const pauseCameraPreview = () => {
    if (cameraRef?.current) {
      cameraRef.current.pausePreview();
    }
  };

  const resumeCameraPreview = () => {
    if (cameraRef?.current) {
      cameraRef.current.resumePreview();
    }
  };

  const handleBarCodeRead = e => {
    setData(e?.data);
    openOverlay();
    pauseCameraPreview();
    registerBarCode();
  };

  const handleBackdropPress = () => {
    closeOverlay();
    resumeCameraPreview();
  };

  const registerBarCode = () => {};

  return (
    <Div flex={1}>
      <RNCamera
        ref={cameraRef}
        style={styles.cameraContainer}
        type={RNCamera.Constants.Type.back}
        barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
        onBarCodeRead={handleBarCodeRead}
        androidCameraPermissionOptions={{
          title: 'Utilisation de la caméra',
          message:
            "Pour pouvoir scanner votre code QR, vous devez accepter l'utilisation de la caméra",
          buttonPositive: 'Accepter',
          buttonNegative: 'Refuser',
        }}
        captureAudio={false}>
        {({ status }) => {
          if (status !== 'READY') {
            return (
              <View>
                <Text>Loading...</Text>
              </View>
            );
          }
          return (
            <BarcodeMask
              width={280}
              height={280}
              edgeBorderWidth={2}
              outerMaskOpacity={0.8}
              showAnimatedLine={false}
            />
          );
        }}
      </RNCamera>

      <Overlay
        ref={overlayRef}
        p="lg"
        h="50%"
        onBackdropPress={handleBackdropPress}>
        <Text fontWeight="bold" fontSize="lg">
          Résultat du QR code
        </Text>
        <Div flex={1} alignItems="center" justifyContent="center">
          <Text
            textDecorLine="underline"
            fontSize="lg"
            onPress={() => onLinkPressed(data)}>
            {data || ''}
          </Text>
        </Div>
      </Overlay>
    </Div>
  );
};

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
  },
});

export default Home;

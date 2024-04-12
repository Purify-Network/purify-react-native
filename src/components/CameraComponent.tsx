import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  Button,
  TouchableOpacity,
  Text,
  Linking,
  Image,
} from 'react-native';
import {Camera, useCameraDevices, useCameraDevice, CameraDevice, useCameraFormat, Templates} from 'react-native-vision-camera';

const CameraComponent = (props: any) => {
//   const camera = useRef<Camera>(null);
//   console.log("kdgldfsn");
  const devices = useCameraDevices().keys;
//   console.log("devices");
  console.log(devices);
//   const device = devices.back;

  const camera = useRef<Camera>(null);
console.log("ttooooototototo");
console.log(useCameraDevice('back'));
     let device = useCameraDevice('back')!;

     const screenAspectRatio = 1;

     const format = useCameraFormat(device, [
      ...Templates.Instagram,
      { photoAspectRatio: 1 },
      // { photoResolution: { width: 3048, height: 3048 } },
      { photoResolution: 'max' },
    { pixelFormat: 'native' },
    ]);

    //  const format = useCameraFormat(device, Templates.FrameProcessingRGB)
     
    // const devices = Camera.getAvailableCameraDevices();
    // console.log("pooooop");
    // console.log(JSON.stringify(devices, null, 2));

    // let device: any;


  const [showCamera, setShowCamera] = useState(false);
  const [imageSource, setImageSource] = useState('');

  useEffect(() => {
    // async function getPermission() {
      // const newCameraPermission = await Camera.requestCameraPermission();
      // console.log(newCameraPermission);
      // let r = useCameraDevices();
      // console.log(r);
      // let q = r
      // console.log("ututututu");
      // console.log(useCameraDevice('back'));
      // device = useCameraDevice('back');
    // }
    // getPermission();
    setShowCamera(true);
  }, []);

  const capturePhoto = async () => {
    if (camera.current !== null) {
      const photo = await camera.current.takePhoto({});
      setImageSource(photo.path);
      setShowCamera(false);
      console.log(photo.path);
    }
  };

  const usePhoto = () => {
    props.callback(imageSource);
  };

  // if (device == null) {
  //   return <Text>Camera not available</Text>;
  // }

  return (
    <View style={styles.container}>
      {showCamera ? (
        <>
          <Camera
            ref={camera}
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={showCamera}
            photo={true}
            format={format}
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.camButton}
              onPress={() => capturePhoto()}
            />
          </View>
        </>
      ) : (
        <>
          {imageSource !== '' ? (
            <Image
              style={styles.image}
              source={{
                uri: `file://'${imageSource}`,
              }}
            />
          ) : null}

          <View style={styles.backButton}>
            <TouchableOpacity
              style={{
                backgroundColor: 'rgba(0,0,0,0.2)',
                padding: 10,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
                borderWidth: 2,
                borderColor: '#fff',
                width: 100,
              }}
              onPress={() => setShowCamera(true)}>
              <Text style={{color: 'white', fontWeight: '500'}}>Back</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <View style={styles.buttons}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#fff',
                  padding: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,
                  borderWidth: 2,
                  borderColor: '#77c3ec',
                }}
                onPress={() => setShowCamera(true)}>
                <Text style={{color: '#77c3ec', fontWeight: '500'}}>
                  Retake
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: '#77c3ec',
                  padding: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,
                  borderWidth: 2,
                  borderColor: 'white',
                }}
                onPress={() => usePhoto()}>
                <Text style={{color: 'white', fontWeight: '500'}}>
                  Use Photo
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: "100%",
    // backgroundColor: "red"
  },
  button: {
    backgroundColor: 'green',
  },
  backButton: {
    backgroundColor: 'rgba(0,0,0,0.0)',
    position: 'absolute',
    justifyContent: 'center',
    width: '100%',
    top: 0,
    padding: 20,
  },
  buttonContainer: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    bottom: 0,
    padding: 20,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  camButton: {
    height: 80,
    width: 80,
    borderRadius: 40,
    //ADD backgroundColor COLOR GREY
    backgroundColor: 'blue',

    alignSelf: 'center',
    borderWidth: 4,
    borderColor: 'black',
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
});

export default CameraComponent;
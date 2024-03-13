// import React, { ReactElement, useEffect, useRef } from 'react';
// import { Linking, StyleSheet } from 'react-native';
// import { Camera, useCameraDevices } from 'react-native-vision-camera';

// const CameraComponent = (): ReactElement => {

//     useEffect(() => {
//         async function getPermission() {
//           const permission = await Camera.requestCameraPermission();
//           console.log(`Camera permission status: ${permission}`);
//           if (permission === 'denied') await Linking.openSettings();
//         }
//         getPermission();
//       }, []);


//       const camera = useRef(null);
//       const devices = useCameraDevices();
//       console.log(devices);
//       const device = devices[0];    


//       const capturePhoto = async () => {
//         if (camera.current !== null) {
//           const photo = await camera.current.takePhoto({});
//           setImageSource(photo.path);
//           setShowCamera(false);
//           console.log(photo.path);
//         }
//       };
    
    
//     return (
//     <>
//               <Camera
//                 ref={camera}
//                 style={StyleSheet.absoluteFill}
//                 device={device}
//                 isActive={showCamera}
//                 photo={true}
//               />
//     </>



// //     const devices = useCameraDevices();
// //     const cameraDevice = devices.back;

// //     const photo = async () => { 
// //         const cameraPermissionStatus = await Camera.requestCameraPermission();
// //         const file = await camera.current!.takePhoto({
// //             flash: 'auto' // 'on' | 'off'
// //         });
// //         const result = await fetch(`file://${file.path}`)
// //         const data = await result.blob();
// //         console.log(data);
// //     }


// //     // onInitialized(){
        
// //     // }
// //     // photo();
// // //     const camera = useRef<Camera>(null);
// // // console.log("ttooooototototo");
// // //     const devices = Camera.getAvailableCameraDevices();
// // //     console.log("pooooop");
// // //     console.log(JSON.stringify(devices, null, 2));

// // // const device = useCameraDevice('back')!;



//     // return(
//     //     <Camera
//     //         ref={camera}
//     //         photo={true} 
//     //         device={device} 
//     //         isActive={true}    
//     //         />
//     // )
// };

// export default CameraComponent;



// // import React, { useState, useEffect, useRef } from 'react';
// // import {
// //   SafeAreaView,
// //   StyleSheet,
// //   Text,
// //   View,
// //   ActivityIndicator,
// //   TextInput,
// //   TouchableOpacity,
// //   Image,
// // } from 'react-native';
// // import {
// //   Camera,
// //   useCameraDevices,
// //   useFrameProcessor,
// // } from 'react-native-vision-camera';
// // import { scanBarcodes, BarcodeFormat } from 'vision-camera-code-scanner';
// // import Animated, {
// //   useAnimatedProps,
// //   useSharedValue,
// // } from 'react-native-reanimated';

// // const AnimatedText = Animated.createAnimatedComponent(TextInput);

// // export default function App() {
// //   const camera = useRef(null);
// //   const [cameraPermission, setCameraPermission] = useState<CameraPermissionRequestResult>();
// //   const [open, setOpen] = useState(false);
// //   const [currentExample, setCurrentExample] = useState('take-photo');
// //   const [photoPath, setPhotoPath] = useState();
// //   const [snapshotPath, setSnapshotPath] = useState();
// //   const [videoPath, setVideoPath] = useState();
// //   const detectorResult = useSharedValue('');

// //   useEffect(() => {
// //     (async () => {
// //       const cameraPermissionStatus = await Camera.requestCameraPermission();
// //       setCameraPermission(cameraPermissionStatus);
// //     })();
// //   }, []);

// //   const devices = useCameraDevices();
// //   const cameraDevice = devices.back;

// // //   const frameProcessor = useFrameProcessor(frame => {
// // //     'worklet';
// // //     const detectedBarcodes = scanBarcodes(frame, [BarcodeFormat.QR_CODE]);
// // //     const barcodesStr = detectedBarcodes
// // //       .map(barcode => barcode.displayValue)
// // //       .join('');
// // //     console.log('Barcodes:', barcodesStr);
// // //     detectorResult.value = barcodesStr;
// // //   }, []);

// //   const animatedTextProps = useAnimatedProps(
// //     () => ({ text: detectorResult.value }),
// //     [detectorResult.value],
// //   );

// //   const handleTakePhoto = async () => {
// //     try {
// //       const photo = await camera.current.takePhoto({
// //         flash: 'on',
// //       });
// //       setPhotoPath(photo.path);
// //     } catch (e) {
// //       console.log(e);
// //     }
// //   };

// //   const renderTakingPhoto = () => {
// //     return (
// //       <View>
// //         <Camera
// //           ref={camera}
// //           style={[styles.camera, styles.photoAndVideoCamera]}
// //           device={cameraDevice}
// //           isActive
// //           photo
// //         />
// //         <TouchableOpacity style={styles.btn} onPress={handleTakePhoto}>
// //           <Text style={styles.btnText}>Take Photo</Text>
// //         </TouchableOpacity>
// //         {photoPath && (
// //           <Image style={styles.image} source={{ uri: photoPath }} />
// //         )}
// //       </View>
// //     );
// //   };

// //   const handleRecordVideo = async () => {
// //     try {
// //       camera.current.startRecording({
// //         flash: 'on',
// //         onRecordingFinished: video => setVideoPath(video.path),
// //         onRecordingError: error => console.error(error),
// //       });
// //     } catch (e) {
// //       console.log(e);
// //     }
// //   };

// //   const handleStopVideo = async () => {
// //     try {
// //       await camera.current.stopRecording();
// //     } catch (e) {
// //       console.log(e);
// //     }
// //   };

// //   const renderRecordingVideo = () => {
// //     return (
// //       <View>
// //         <Camera
// //           ref={camera}
// //           style={[styles.camera, styles.photoAndVideoCamera]}
// //           device={cameraDevice}
// //           isActive
// //           video
// //         />
// //         <View style={styles.btnGroup}>
// //           <TouchableOpacity style={styles.btn} onPress={handleRecordVideo}>
// //             <Text style={styles.btnText}>Record Video</Text>
// //           </TouchableOpacity>
// //           <TouchableOpacity style={{ ...styles.btn }} onPress={handleStopVideo}>
// //             <Text style={styles.btnText}>Stop Video</Text>
// //           </TouchableOpacity>
// //         </View>
// //         {videoPath && (
// //           <Video source={{ uri: videoPath }} style={styles.video} />
// //         )}
// //       </View>
// //     );
// //   };

// //   const handleTakeSnapshot = async () => {
// //     try {
// //       const snapshot = await camera.current.takeSnapshot({
// //         quality: 85,
// //         skipMetadata: true,
// //       });
// //       setSnapshotPath(snapshot.path);
// //     } catch (e) {
// //       console.log(e);
// //     }
// //   };

// //   const renderTakingSnapshot = () => {
// //     return (
// //       <View>
// //         <Camera
// //           ref={camera}
// //           style={[styles.camera, styles.photoAndVideoCamera]}
// //           device={cameraDevice}
// //           isActive
// //           photo
// //         />
// //         <TouchableOpacity style={styles.btn} onPress={handleTakeSnapshot}>
// //           <Text style={styles.btnText}>Take Snapshot</Text>
// //         </TouchableOpacity>
// //         {snapshotPath && (
// //           <Image style={styles.image} source={{ uri: snapshotPath }} />
// //         )}
// //       </View>
// //     );
// //   };

// //   const renderCodeScanner = () => {
// //     return (
// //       <View>
// //         <Camera
// //           style={styles.camera}
// //           device={cameraDevice}
// //           isActive
// //           frameProcessor={frameProcessor}
// //           frameProcessorFps={5}
// //         />
// //         <AnimatedText
// //           style={styles.barcodeText}
// //           animatedProps={animatedTextProps}
// //           editable={false}
// //           multiline
// //         />
// //       </View>
// //     );
// //   };

// //   const renderContent = () => {
// //     if (cameraDevice == null) {
// //       return <ActivityIndicator size="large" color="#1C6758" />;
// //     }
// //     if (cameraPermission !== 'authorized') {
// //       return null;
// //     }
// //     switch (currentExample) {
// //       case 'take-photo':
// //         return renderTakingPhoto();
// //       case 'record-video':
// //         return renderRecordingVideo();
// //       case 'take-snapshot':
// //         return renderTakingSnapshot();
// //       case 'code-scanner':
// //         return renderCodeScanner();
// //       default:
// //         return null;
// //     }
// //   };

// //   const handleChangePicketSelect = value => {
// //     setPhotoPath(null);
// //     setSnapshotPath(null);
// //     setVideoPath(null);
// //     setCurrentExample(value);
// //   };

// //   return (
// //     <View style={styles.screen}>
// //       <SafeAreaView style={styles.saveArea}>
// //         <View style={styles.header}>
// //           <Text style={styles.headerText}>React Native Camera Libraries</Text>
// //         </View>
// //       </SafeAreaView>

// //       <View style={styles.caption}>
// //         <Text style={styles.captionText}>
// //           Welcome To React-Native-Vision-Camera Tutorial
// //         </Text>
// //       </View>

// //       <View style={styles.dropdownPickerWrapper}>
// //         <DropDownPicker
// //           open={open}
// //           value={currentExample}
// //           items={[
// //             { label: 'Take Photo', value: 'take-photo' },
// //             { label: 'Record Video', value: 'record-video' },
// //             { label: 'Take Snapshot', value: 'take-snapshot' },
// //             { label: 'Code Scanner', value: 'code-scanner' },
// //           ]}
// //           setOpen={setOpen}
// //           setValue={handleChangePicketSelect}
// //         />
// //       </View>

// //       {renderContent()}
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   screen: {
// //     flex: 1,
// //     backgroundColor: '#EEF2E6',
// //   },
// //   saveArea: {
// //     backgroundColor: '#3D8361',
// //   },
// //   header: {
// //     height: 50,
// //     backgroundColor: '#3D8361',
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //   },
// //   headerText: {
// //     color: '#ffffff',
// //     fontSize: 20,
// //   },
// //   caption: {
// //     height: 100,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //   },
// //   captionText: {
// //     color: '#100F0F',
// //     fontSize: 16,
// //     fontWeight: '600',
// //   },
// //   camera: {
// //     height: 460,
// //     width: '92%',
// //     alignSelf: 'center',
// //   },
// //   photoAndVideoCamera: {
// //     height: 360,
// //   },
// //   barcodeText: {
// //     paddingHorizontal: 16,
// //     paddingVertical: 20,
// //     textAlign: 'center',
// //     color: '#100F0F',
// //     fontSize: 24,
// //   },
// //   pickerSelect: {
// //     paddingVertical: 12,
// //   },
// //   image: {
// //     marginHorizontal: 16,
// //     paddingTop: 8,
// //     width: 80,
// //     height: 80,
// //   },
// //   dropdownPickerWrapper: {
// //     paddingHorizontal: 16,
// //     paddingBottom: 16,
// //     zIndex: 9,
// //   },
// //   btnGroup: {
// //     margin: 16,
// //     flexDirection: 'row',
// //   },
// //   btn: {
// //     backgroundColor: '#63995f',
// //     margin: 13,
// //     paddingHorizontal: 20,
// //     paddingVertical: 16,
// //     borderRadius: 8,
// //   },
// //   btnText: {
// //     color: '#ffffff',
// //     fontSize: 20,
// //     textAlign: 'center',
// //   },
// //   video: {
// //     marginHorizontal: 16,
// //     height: 100,
// //     width: 80,
// //     position: 'absolute',
// //     right: 0,
// //     bottom: -80,
// //   },
// // });







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
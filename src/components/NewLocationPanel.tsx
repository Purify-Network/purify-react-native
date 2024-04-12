// import { FlatList, Image, StyleSheet, View } from "react-native";
import React, {ReactElement, useEffect, useState} from 'react';
import {Button, Dimensions, FlatList, Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableHighlight, View} from 'react-native';
import CameraComponent from './CameraComponent';
import MainService from '../services/MainService';
// import * as fs from 'fs';
import { Blob } from "buffer";
import RNFS from 'react-native-fs';


interface Coordinates {
    latitude: number;
    longitude: number;
  }
  
  interface TestingInfo {
    testType: string;
    testResult: string;
  }
  
  interface NewLocationPanelProps {
    name: string;
    coordinates: Coordinates;
    testingInfo: TestingInfo[];
    imageSource: string;
    closePanel: () => void,
    server: MainService
  }

  const styles2 = StyleSheet.create({
    container: {
      // backgroundColor: '#aa1111',
      padding: 20,
      height: "100%"
      // flexDirection: "row"
      // marginBottom: 20,
      // borderRadius: 10,
      // shadowColor: '#000',
      // shadowOffset: {
      //   width: 0,
      //   height: 2,
      // },
      // shadowOpacity: 0.25,
      // shadowRadius: 3.84,
      // elevation: 5,
    },
    typeIcon: {
      aspectRatio:1, 
      width: "100%"
    },
    typeIconContainer: {
      width: "39.5%", 
      // position: "relative", 
      marginLeft: "7%",
      marginTop: 21
      // backgroundColor: "yellow"
    },
    container2: {
      // backgroundColor: '#827463',
      flexDirection: "row",
      // marginTop: 10
      // padding: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
      // backgroundColor: "white"
      borderBottomColor: "black",
      borderBottomWidth: 1,
      color: "black"
    },
    subtitle: {
      fontSize: 16,
      marginTop: 10,
      marginBottom: 10,
      // backgroundColor: "white"
      borderBottomColor: "black",
      borderBottomWidth: 1
    },
    testingInfoItem: {
      marginBottom: 5,
    },
    image: {
      width: '100%',
      // height: 200,
      borderRadius: 10,
      marginBottom: 15,
      aspectRatio: 1
      // marginTop: -20
      // backgroundColor: "red"
    },
    cameraContainer: {
      width: '100%',
      height: "100%",
      zIndex: 500
    },
    bottomButton: {
      width: "100%",
      height: 70,
      borderRadius: 35,
      backgroundColor: "#609EEF",
      // marginTop: "100%",
      // position: "absolute",
      // flexDirection: "row",
      // top:10,
      // bottom: 10,
      // flex: 1,
      left: "0%",
      // marginLeft: "50%",
      // right: 70,
      zIndex: 100,
      borderBlockColor: '#eeeeee',
      borderLeftColor: '#eeeeee',
      borderRightColor: '#eeeeee',
      borderWidth: 2,
      marginTop: 10
    },
  });


const NewLocationPanel: React.FC<NewLocationPanelProps> = ({ name, coordinates, testingInfo, imageSource, closePanel, server }) => {

  const [showFormStep, setshowFormStep] = useState(3);
  const [imgPath, setImgPath] = useState('https://i.fbcd.co/products/resized/resized-750-500/f8b30a80c3dd7846280debe018062435fb0273b9a391c2d05b1783ac5a473077.jpg');
  // const [image, setImage] = useState<FormData>();
  // const [files, setFiles] = useState("");
  const [inputName, setInputName] = useState("");
  const [inputDescription, setInputDescription] = useState("");
  // let pp = -1;
  let lt = -1;


  const loadCamera = () => {
    setshowFormStep(1);
  };

  const getPhotoPath = (path: string) => {
    setImgPath(path);
    console.log("pathhhhh");
    console.log(path);
    setshowFormStep(0);
}

// const getPhotoBlob = (imageData: any) => {
//   setImgPath(imageData);
// }

// const publicPrivate = (mode: number) => {
//   pp = mode;
//   setshowFormStep(3);
// }

const locType = (type: number) => {
  lt = type;
  setshowFormStep(0);
}

// const getFileContent = async (path: string) => {
//   console.log("popop");
//   console.log(path);
//   // console.log(RNFS.PicturesDirectoryPath);
//   const reader = await RNFS.readFile(path);
//   // setFiles(reader);
//   console.log("hhh");
//   // console.log(files);
// };

const addAquaSpot = () => {
  let noSpacesInputName = inputName.replace(' ', '');
  let filename = noSpacesInputName + Date.now() + '.jpeg';
  uploadImage(filename);
  server.new_loc(inputName, filename, coordinates.latitude, coordinates.longitude, Math.floor(Date.now()/1000))
}

const uploadImage = (filename: string) => {
  // let buffer = fs.readFileSync(imageSource);
  // let blob = new Blob([buffer]);

// console.log(RNFS.DocumentDirectoryPath);
// getFileContent(imgPath);

// console.log(inputName);
// let noSpacesInputName = inputName.replace(' ', '');
// console.log(noSpacesInputName);

// let filename = noSpacesInputName + Date.now() + '.jpeg';

var files = [
  {
    name: "image12",
    filename: filename,
    filepath: imgPath,
    filetype: 'image/jpeg'
  }
];

RNFS.uploadFiles({
  toUrl: "https://purify.network:3000/upload-image",
  files: files,
  method: 'POST',
  headers: {
    'Accept': 'application/json',
  },
  fields: {
    'name': inputName,
    'description': inputDescription,
    'filename': filename
  },
  // begin: uploadBegin,
  // progress: uploadProgress
}).promise.then((response) => {
    if (response.statusCode == 200) {
      console.log('FILES UPLOADED!'); // response.statusCode, response.headers, response.body
    } else {
      console.log('SERVER ERROR');
    }
  })
  .catch((err) => {
    if(err.description === "cancelled") {
      // cancelled by user
    }
    console.log(err);
  });

  // const formData = new FormData(); 
  // // formData.append('my-image-file', new File([blob], imageSource));
  // formData.append('type', 'file')
  // formData.append('image', imgPath)
  // server.uploadImage(formData);
}

const finalPage = () => {
  return (
    <View style={styles2.container}>
    <Pressable onPress={loadCamera}>
      <Image source={{
        uri: imgPath,
      }} style={styles2.image} resizeMode="cover" />
    </Pressable>
    <TextInput 
      style={styles2.title}
      onChangeText={newText => setInputName(newText)}  
    >AquaSpot Name</TextInput>
    <TextInput 
      numberOfLines={3} 
      style={styles2.subtitle} 
      onChangeText={newText => setInputDescription(newText)}>Please describe this AquaSpot</TextInput>
    {/* <FlatList
      data={testingInfo}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <View style={styles2.testingInfoItem}>
          <Text>{item.testType}: {item.testResult}</Text>
        </View>
      )} /> */}
      <TouchableHighlight
          onPress={addAquaSpot}
          underlayColor="white"
          style={styles2.bottomButton}>
            <Text>Add AquaSpot</Text>
        </TouchableHighlight>

        <TouchableHighlight
          onPress={closePanel}
          underlayColor="white"
          style={{...styles2.bottomButton, backgroundColor: "lightgrey"}}>
            <Text>Cancel</Text>
        </TouchableHighlight>
  </View>
  )
}

// const displayPublicPrivate = () => {
//   return (
//     <View style={{...styles2.container2}}>
//       <Pressable style={styles2.typeIconContainer} onPress={() => {publicPrivate(0)}}>
//         <Image source={{
//           uri: imgPath,
//         }} style={styles2.typeIcon}/>
//       </Pressable>
//       <Pressable style={styles2.typeIconContainer} onPress={() => {publicPrivate(1)}}>
//         <Image source={{
//           uri: imgPath,
//         }} style={styles2.typeIcon}/>
//       </Pressable>
//     </View>
//   )
// }

const displayLocType = () => {
  return (
    <ScrollView style={{height: "100%", width: "100%"}}>
      {
        [0, 1, 2, 3, 4].map((row) => (
          <View style={{...styles2.container2}}>
          {[0, 1].map((col) => (
            <Pressable key={`btn${col}-${row}`} style={styles2.typeIconContainer} onPress={() => {locType((row*2)+col)}}>
            <Image source={{
              uri: imgPath,
            }} style={styles2.typeIcon}/>
          </Pressable>
          ))}
        </View>
        ))
      }
    </ScrollView>
  )
}

    return (
      <View style={{overflow: "scroll", height: "100%", width: "100%"}}>
        { showFormStep==1 ? <View style={styles2.cameraContainer}><CameraComponent callback={getPhotoPath} /></View> : 
          showFormStep==0 ? finalPage() : 
          // showFormStep==2 ?  displayPublicPrivate(): 
          showFormStep==3 ?  displayLocType(): ""
       }
      </View>
    );
  };

  export default NewLocationPanel;
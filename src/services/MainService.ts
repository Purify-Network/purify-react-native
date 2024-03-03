import React, { useState, useEffect } from "react"; 
import { Text, View, StyleSheet, Alert } from 'react-native'; 
import { Button } from "react-native-paper"; 
import CryptoJS from 'react-native-crypto-js';
  
class MainService {

    login = async (username: string, password: string) => { 
        const hashedPassword = CryptoJS.MD5(password).toString(CryptoJS.enc.Hex);
        console.log(hashedPassword);
        const requestOptions = { 
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' }, 
            body: JSON.stringify({ username: username, password: hashedPassword }) 
        }; 
        console.log("tttttt");
        try { 
            return await fetch( 
                'http://64.23.146.168:3000/login', requestOptions) 
                .then(response => { 
                    return response.json() 
                        .then(data => { 
                            console.log("ddddd");
                            console.log(data);
                            return data;
                        }); 
                }) 
        } 
        catch (error) { 
            console.error(error); 
        } 
    }


    signup = async (username: string, password: string, email: string) => { 
        const hashedPassword = CryptoJS.MD5(password).toString(CryptoJS.enc.Hex);
        console.log(hashedPassword);
        const requestOptions = { 
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' }, 
            body: JSON.stringify({ username: username, password: hashedPassword, email: email }) 
        }; 
        console.log("fffff");
        try { 
            await fetch( 
                'http://64.23.146.168:3000/signup', requestOptions) 
                .then(response => { 
                    response.json() 
                        .then(data => { 
                            console.log(data);
                        }); 
                }) 
        } 
        catch (error) { 
            console.error(error); 
        } 
    } 


    getNearbyLocs = (lat: number, lng: number, radius: number) => { 
        const requestOptions = { 
            method: 'GET', 
            headers: { 'Content-Type': 'application/json' }, 
            // body: JSON.stringify({ lat: lat, lng: lng, radius: radius }) 
        }; 
        console.log("fffff");
        let url = `http://64.23.146.168:3000/locs-near-me?lng=${lng}&lat=${lat}&radius=${radius}`;
        try { 
            return fetch( 
                url, requestOptions) 
                .then(response => { 
                    return response.json() 
                        .then(data => { 
                            console.log("ggg");
                            console.log(data); 
                            return data;
                        }); 
                }) 
        } 
        catch (error) { 
            // return new Promise<any>();
            console.error(error); 
        } 
    } 


    genericGetNoParams = (endpoint: string) => { 
        const requestOptions = { 
            method: 'GET', 
            headers: { 'Content-Type': 'application/json' }
        }; 
        console.log("fffff");
        let url = `http://64.23.146.168:3000/${endpoint}`;
        try { 
            return fetch( 
                url, requestOptions) 
                .then(response => { 
                    return response.json() 
                        .then(data => { 
                            console.log("ggg");
                            console.log(data); 
                            return data;
                        }); 
                }) 
        } 
        catch (error) { 
            // return new Promise<any>();
            console.error(error); 
        } 
    } 

    new_loc = async (name: string, image_path: string, lat: number, lng: number, epoch: number) => { 
        const requestOptions = { 
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' }, 
            body: JSON.stringify({ name: name, image_path: image_path, latitude: lat, longitude: lng, epoch: epoch }) 
        }; 
        console.log("fffff");
        try { 
            await fetch( 
                'http://64.23.146.168:3000/new-loc', requestOptions) 
                .then(response => { 
                    response.json() 
                        .then(data => { 
                            console.log(data);
                        }); 
                }) 
        } 
        catch (error) { 
            console.error(error); 
        } 
    } 
  
}

  
export default MainService; 
import { Image } from 'expo-image';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


const UpgradeBanner: React.FC = () => {
  return (
    <View style={styles.container}>
        <Image 
        source={require("../../assets/images/star-upgrade.png")}
        transition={1000}
        style={{width:19, height:19,position:"absolute", top:5,left:5}}
      />
      <View style={{flex:0.65, gap:2}}>
       
      <Text style={styles.text}>Go Pro</Text>
      <Text style={styles.subtext}>You can connect to 100 servers all over the world</Text>
      </View>
      <View style={{flex:0.35, justifyContent:"center", alignItems:"center"}}>
        <Image 
        source={require("../../assets/images/icon.png")}
        transition={1000}
        style={{width:130, height:130}}
      />
      </View>
      
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#6398ff',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 16,
    flexDirection: "row",
    position:"relative"
  },
  text: {
    color: '#000',
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily:'Poppins.500'
  },
  subtext: {
    color: '#000',
    fontSize: 14,
  
       fontFamily:'Poppins.400'
  },
});

export default UpgradeBanner;

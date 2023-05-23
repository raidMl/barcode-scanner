import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View ,Button} from 'react-native';
import react ,{useState,useEffect} from 'react'
import { BarCodeScanner } from 'expo-barcode-scanner';


export default function App() {
  const [permission,setPermission]=useState(null)
  const [scane,setScan]=useState(false)
  const [text,setText]=useState('not yet scanned')
  const askForcameraPermission=()=>{
    (async()=>{
      const {status}=await BarCodeScanner.requestPermissionsAsync()
      setPermission(status === 'granted');
    })()
  }

  //request cam permission
  useEffect(()=>{
askForcameraPermission();
  },[])
//what happen if we scan bar code
const handleScan=({type,data})=>{
setScan(true);
setText(data)
console.log('Type: '+type+'\ndata: '+data)
}
//check permission and return screen
if(permission===null){
  return (
    <View style={styles.container}>
      <Text>Requesting for camera permission</Text>
    </View>
  );
}
if(permission===false){
  return (
    <View style={styles.container}>
      <Text style={{margin:10}}>No access to camera</Text>
      <Button title={'allow cam'} onPress={()=>askForcameraPermission()}/>

    </View>
  );
}

  return (
    <View style={styles.container}>
   <View style={styles.barcodeBox}>
    <BarCodeScanner  onBarCodeScanned={scane?undefined:handleScan} style={{height:400,
    width:400
    }}/>    
    </View> 
    <Text style={styles.mainText}> {text} </Text> 
    {scane && <Button title={"scan again"} color={"tomato"} onPress={()=>{setScan(false);setText('')} }/> }
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  barcodeBox:{
    alignItems: 'center',
    justifyContent: 'center',
    height: 250,
    width: 220,
    overflow: 'hidden',
    borderRadius:20,
    backgroundColor: '#0f05d'
  },
  mainText:{
    fontSize:16,
    margin:20
  }
  
});

import React, { useRef, useState, useCallback, useEffect } from "react";
import { BackHandler } from "react-native";
import { StyleSheet, View, Text, Image, StatusBar } from 'react-native';
import { WebView } from 'react-native-webview';
import { useNetInfo } from "@react-native-community/netinfo";


export default function App() {


  //@override back button action...
  const webView = useRef();

  const [canGoBack, setCanGoBack] = useState(false);

  const handleBack = useCallback(() => {
    if (canGoBack && webView.current) {
      webView.current.goBack();
      return true;
    }
    return false;
  }, [canGoBack]);

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBack);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBack);
    };
  }, [handleBack]);

  const netInfo = useNetInfo();
  const styles = StyleSheet.create({
    image: { //style for centering the image
      resizeMode: 'contain',
      alignSelf: 'center',
      width: '100%',
      height: '100%',
    }
  })

  if (netInfo.isInternetReachable) { //checking the internet cionnection
    return (<>
      <StatusBar
        backgroundColor="#372b2b"
        barStyle="light-content"
        hidden={false}
        translucent={true}
      />
      <WebView  //showing the myplate website
        ref={webView}
        startInLoadingState={true}
        renderLoading={() => <>
          <View>
            <Image //showing initial loading  gif
              source={require('./assets/progess-bar2.gif')}
              style={styles.image}
            />
          </View>
        </>}
        pullToRefreshEnabled={true}
        source={{ uri: 'https://www.myplate.xyz/' }}
        style={{ marginTop: 15 }}
        onLoadProgress={(event) => setCanGoBack(event.nativeEvent.canGoBack)}
        domStorageEnabled={true}
        startInLoadingState={true}
      />
    </>
    );
  } else {  //no internet connection
    return (
      <View>
        <Image //showing no internet gif
          source={require('./assets/no_internet.gif')}
          style={styles.image}
        />
      </View>
    )
  }

};

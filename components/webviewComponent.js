import { StyleSheet, Text, View } from "react-native";
import { WebView } from "react-native-webview";

export default function webviewComponent() {
  return <WebView source={{ uri: "https://www.myplate.xyz/" }} />;
}

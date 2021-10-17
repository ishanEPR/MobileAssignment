import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
  Modal,
  Button,
} from "react-native";

export default function SettingsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Settings Screen</Text>
      <Button title="Click Here" onPress={() => navigation.navigate("Home")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

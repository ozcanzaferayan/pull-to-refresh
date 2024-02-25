import React from "react";
import { Image, ScrollView } from "react-native";

const Pills = () => {
  return (
    <ScrollView
      horizontal
      contentContainerStyle={{
        paddingStart: 16,
        gap: 8,
      }}
    >
      <Image
        style={{ width: 120, height: 70 }}
        resizeMode="contain"
        source={require("../../assets/Pills-ramen.png")}
      />
      <Image
        style={{ width: 120, height: 70 }}
        resizeMode="contain"
        source={require("../../assets/pills-sushi.png")}
      />
      <Image
        style={{ width: 120, height: 70 }}
        resizeMode="contain"
        source={require("../../assets/pills-rolls.png")}
      />
      <Image
        style={{ width: 120, height: 70 }}
        resizeMode="contain"
        source={require("../../assets/Pills-ramen.png")}
      />
    </ScrollView>
  );
};

export default Pills;

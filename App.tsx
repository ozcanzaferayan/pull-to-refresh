import { useRef, useState } from "react";
import { Animated, Image, ScrollView, View } from "react-native";
import CustomRefreshControl from "./src/components/CustomRefreshControl";
import Images from "./src/components/Images";
import Pills from "./src/components/Pills";

export default function App() {
  const video = useRef(null);
  const [status, setStatus] = useState({});
  const [refreshing, setRefreshing] = useState(false);
  const scrollOffsetY = useRef(new Animated.Value(0)).current;
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const scrollRef = useRef<ScrollView>(null);

  const handleScroll = (event) => {
    const yOffset = event.nativeEvent.contentOffset.y;
    // Logic to enable/disable scrolling based on yOffset
    if (yOffset < -150) {
      if (scrollEnabled) {
        setScrollEnabled(false);
        setTimeout(() => {
          setScrollEnabled(true);
          scrollRef.current?.scrollTo({ y: 0, animated: true });
        }, 1100);
      }
    } else {
      if (!scrollEnabled) setScrollEnabled(true);
    }
  };

  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }],
    {
      useNativeDriver: true,
      listener: (event) => {
        // Additional listener for logging or other side effects
        const yValue = event.nativeEvent.contentOffset.y;
        console.log(yValue); // Log the current scroll position
        handleScroll(event);
      },
    }
  );
  return (
    <View
      style={{
        backgroundColor: "#f4f4f4",
        flex: 1,
        paddingTop: 48,
      }}
    >
      <Animated.ScrollView
        ref={scrollRef}
        contentContainerStyle={{}}
        onScroll={onScroll}
        scrollEnabled={scrollEnabled}
      >
        <CustomRefreshControl
          scrollOffsetY={scrollOffsetY}
          isReached={!scrollEnabled}
        />

        <Image
          source={require("./assets/Popular foods.png")}
          style={{ width: "100%", paddingHorizontal: 16, height: 120 }}
          resizeMode="contain"
        />
        <Pills />
        <Image
          source={require("./assets/Discount.png")}
          style={{ width: "100%", height: 140 }}
          resizeMode="contain"
        />
        <Images />
      </Animated.ScrollView>
    </View>
  );
}

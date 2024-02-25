import { ResizeMode, Video } from "expo-av";
import React, { useEffect } from "react";
import { Animated } from "react-native";

interface Props {
  scrollOffsetY: Animated.AnimatedInterpolation<string | number>;
  isReached: boolean;
}

const CustomRefreshControl = ({ scrollOffsetY, isReached }: Props) => {
  const video = React.useRef<Video>(null);
  const [status, setStatus] = React.useState({});

  const height = scrollOffsetY.interpolate({
    inputRange: [-150, 0],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  useEffect(() => {
    if (isReached) {
      console.log(isReached);
      video.current?.playAsync();
      setTimeout(() => {
        video.current?.stopAsync();
      }, 1500);
    }
  }, [isReached]);
  return (
    <Animated.View
      style={{
        height: 150,
        marginTop: -150,
        transform: [{ scale: height }],
      }}
    >
      <Video
        ref={video}
        style={{
          height: "100%",
          width: "100%",
          backgroundColor: "#f4f4f4",
        }}
        source={require("../../assets/video.mp4")}
        useNativeControls={false}
        resizeMode={ResizeMode.CONTAIN}
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      />
    </Animated.View>
  );
};

// const CustomRefreshControl = (props) => {
//   console.log(props);
//   const video = React.useRef(null);
//   const [status, setStatus] = React.useState({});
//   return (
//     <RefreshControl
//       refreshing={false}
//       onRefresh={() => {
//         console.log("refreshing");
//       }}
//     >
//       <Video
//         ref={video}
//         style={{ width: "100%", height: 150, backgroundColor: "#f4f4f4" }}
//         source={require("../../assets/video.mp4")}
//         useNativeControls={false}
//         resizeMode={ResizeMode.CONTAIN}
//         isLooping
//         onPlaybackStatusUpdate={(status) => setStatus(() => status)}
//       />
//     </RefreshControl>
//   );
// };

export default CustomRefreshControl;

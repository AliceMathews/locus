import React, { useState, useEffect } from "react";
import { Animated } from "react-native";

export default function FadeInView(props) {
  const [fadeAnim] = useState(new Animated.Value(0));
  const { duration, delay } = props;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration,
      delay
    }).start();
  }, []);

  return (
    <Animated.View style={{ opacity: fadeAnim }}>
      {props.children}
    </Animated.View>
  );
}

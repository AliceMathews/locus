import { useEffect, useState } from "react";
import * as Brightness from "expo-brightness";

export default function useScreenBrightness() {
  const [currentBrightness, setCurrentBrightness] = useState(1);

  useEffect(() => {
    (async () => {
      const { status } = await Brightness.requestPermissionsAsync();
      if (status === "granted") {
        const currentBrightness = await Brightness.getBrightnessAsync();
        setCurrentBrightness(currentBrightness);
      }
    })();
  }, []);
  return { currentBrightness };
}

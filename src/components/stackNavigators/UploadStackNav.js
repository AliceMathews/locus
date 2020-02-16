import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import UploadScreen from "../screens/upload/UploadScreen";

const UploadStack = createStackNavigator();

export default function UploadStackNav() {
  return (
    <UploadStack.Navigator>
      <UploadStack.Screen name="Upload Photo" component={UploadScreen} />
    </UploadStack.Navigator>
  );
}

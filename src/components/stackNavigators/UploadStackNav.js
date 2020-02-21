import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import UploadScreen from "../screens/upload/UploadScreen";

const UploadStack = createStackNavigator();

export default function UploadStackNav({ token }) {
  console.log(token);
  return (
    <UploadStack.Navigator>
      <UploadStack.Screen name="Upload Photo">
        {() => <UploadScreen token={token} />}
      </UploadStack.Screen>
    </UploadStack.Navigator>
  );
}

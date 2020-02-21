import React, { useState, useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";

export default function EmptyTop(props) {
  return (
    <>
      <MaterialIcons
        name={"add-circle"}
        size={40}
        color={"blue"}
        onPress={() => props.press()}
      />
      <MaterialIcons
        name={"add-a-photo"}
        size={40}
        color={"blue"}
        onPress={() => props.pressCam()}
      />
    </>
  );
}

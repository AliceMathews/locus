import React, { useState, useEffect } from "react";
import { Text, View, Button, Image } from "react-native";

// import styles from "./TagStyle";

export default function Tag(props) {
  const name = props.tagName;
  return <Button title={props.tagName} />;
}

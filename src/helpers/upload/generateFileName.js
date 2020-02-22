const generateFileName = () => {
  let count = 0;
  let randomString = "";

  while (count < 6) {
    let randomNumber = Math.floor(Math.random() * (122 - 48 + 1) + 48);
    let randomChar = "";

    if (randomNumber >= 58 && randomNumber <= 64) {
      continue;
    } else if (randomNumber >= 91 && randomNumber <= 96) {
      continue;
    } else {
      //convert to character
      randomChar = String.fromCharCode(randomNumber);
      randomString += randomChar;
      count++;
    }
  }

  return `${randomString}.jpg`;
};

export default generateFileName;

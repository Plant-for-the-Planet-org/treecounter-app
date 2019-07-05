const getGradiantPosition = value => {
  if (value <= -1.0 || value <= -0.9) {
    return 0;
  } else if (value <= -0.9 || value <= -0.8) {
    return 1;
  } else if (value <= -0.8 || value <= -0.7) {
    return 2;
  } else if (value <= -0.7 || value <= -0.6) {
    return 3;
  } else if (value <= -0.6 || value <= -0.5) {
    return 4;
  } else if (value <= -0.5 || value <= -0.4) {
    return 5;
  } else if (value <= -0.4 || value <= -0.3) {
    return 6;
  } else if (value <= -0.3 || value <= -0.2) {
    return 7;
  } else if (value <= -0.2 || value <= -0.1) {
    return 8;
  } else if (value <= -0.1 || value <= 0) {
    return 9;
  } else if (value <= 0 || value <= 0.1) {
    return 10;
  } else if (value <= 0.1 || value <= 0.2) {
    return 11;
  } else if (value <= 0.2 || value <= 0.3) {
    return 12;
  } else if (value <= 0.3 || value <= 0.4) {
    return 13;
  } else if (value <= 0.4 || value <= 0.5) {
    return 14;
  } else if (value <= 0.5 || value <= 0.6) {
    return 15;
  } else if (value <= 0.6 || value <= 0.7) {
    return 16;
  } else if (value <= 0.7 || value <= 0.8) {
    return 17;
  } else if (value <= 0.8 || value <= 0.9) {
    return 18;
  } else if (value <= 0.9 || value < 1) {
    return 19;
  } else if (value >= 1) {
    return 20;
  }
};

export default getGradiantPosition;

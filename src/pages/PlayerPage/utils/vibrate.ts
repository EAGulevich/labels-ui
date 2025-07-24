const VIBRATION = {
  default: 180,
  long: 1000,
  roundStart: [150, 30, 150],
  voteRequest: [400, 100, 100],
};

export const vibrate = (type?: keyof typeof VIBRATION) => {
  if ("vibrate" in navigator) {
    navigator.vibrate(VIBRATION[type || "default"]);
  }
};

const messageOfLove = (score) => {
  if (score > 0 && score <= 30) {
    return "Uh-Oh maybe stay friends";
  }
  if (score > 30 && score <= 60) {
    return "There's potential, keep trying";
  }
  if (score > 60 && score <= 85) {
    return "You both are a great match";
  }
  if (score > 85) {
    return "Perfect soulmates";
  }
};

module.exports = messageOfLove;

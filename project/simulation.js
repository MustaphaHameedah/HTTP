const simulation = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      setTimeout(() => {
        setTimeout(() => {
          resolve();
          console.log("Generating results");
        }, 6000);
        console.log("Analyzing hearts");
      }, 3000);
      console.log("Calculating compatibility");
    }, 1000);
  });
};

module.exports = simulation;

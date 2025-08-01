const http = require("http");
const port = 8000;
const messageOfLove = require("./score");
const simulation = require("./simulation.js");
const result1 = require("./result.json");
const { writefilefunc, appendFileFunc } = require("./fileSystem.js");

const server1 = http.createServer((req, res) => {
  const { method, url } = req;

  if (method === "POST" && url.startsWith("/calculate")) {
    let body = "";

    req.on("data", (chunks) => {
      body += chunks;
    });
    req.on("end", async () => {
      const data = JSON.parse(body);

      const firstScore = Math.floor(Math.random() * 100);
      const secondScore = Math.floor(Math.random() * 100);
      const averageScore = (firstScore + secondScore) / 2;

      await simulation();

      const { name1, name2, score1, score2, average, message } = data;
      const result = {
        name1,
        name2,
        score1: firstScore,
        score2: secondScore,
        average: averageScore,
        message: messageOfLove(averageScore),
      };

      const result2 = `${name1} scored ${firstScore}% \n${name2} scored ${secondScore}% \nAverage: ${averageScore} \nMessage: ${messageOfLove(
        averageScore
      )}`;
      console.log(result1);

      console.log(result2);

      result1.push(result);
      writefilefunc("./project/result.json", result1);
      appendFileFunc("./project/result.txt", result2);

      res.writeHead(201, { "content-type": "application/json" });
      res.end(
        JSON.stringify({
          message: "Love calculated successfully",
          data: result,
        })
      );
    });
  }
});

server1.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

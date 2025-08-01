const http = require("http");
const fs = require("fs");
const port = 6400;
const uuid = require("uuid").v4;
const goodsDB = require("./goodsDB.json");

const writefilefunc = (data) => {
  fs.writeFile("./goodsDB.json", JSON.stringify(data), "utf-8", (err, data) => {
    if (err) {
      console.log(err.message);
    } else {
      return data;
    }
  });
};

const server = http.createServer((req, res) => {
  const { method, url } = req;
  if (method === "POST" && url.startsWith("/CreateNewGoods")) {
    let body = "";

    req.on("data", (chunks) => {
      body += chunks;
      console.log(body);
    });

    req.on("end", () => {
      const data = JSON.parse(body);
      console.log(data);

      const { name, instock, unit, unitprice, quantity, totalprice } = data;

      const newGoods = {
        id: uuid(),
        name,
        instock,
        unit,
        unitprice,
        quantity,
        totalprice: quantity * unitprice,
      };
      console.log(newGoods);

      goodsDB.push(newGoods);
      writefilefunc(goodsDB);

      res.writeHead(201, { "content-type": "application/json" });
      res.end(
        JSON.stringify({
          message: "Goods created successfully",
          data: newGoods,
        })
      );
    });
  } else if (method === "GET" && url.startsWith("/getAllGoods")) {
    if (goodsDB.length < 1) {
      res.writeHead(404, { "content-type": "application/json" });
      res.end(
        JSON.stringify({
          message: "Goods not found",
        })
      );
    } else {
      res.writeHead(200, { "content-type": "application/json" });
      res.end(
        JSON.stringify({
          message: "Goods retrieved successfully",
          data: goodsDB,
        })
      );
    }
  } else if (method === "PUT" && url.startsWith("/updateGood")) {
    let body = "";

    req.on("data", (chunks) => {
      body += chunks;
      console.log(body);
    });

    req.on("end", () => {
      const data = JSON.parse(body);
      console.log(data);
      const id = url.split("/")[2];
      console.log(id);
      const good = goodsDB.find((el) => el.id === id);
      const findGoodIndex = goodsDB.findIndex((el) => el.id === good.id);

      goodsDB[findGoodIndex] = { ...goodsDB[findGoodIndex], ...data };

      writefilefunc(goodsDB);
      res.writeHead(200, { "content-type": "application/json" });
      res.end(
        JSON.stringify({
          message: "Goods updated successfully",
          data: goodsDB[findGoodIndex],
        })
      );
    });
  } else if (method === "DELETE" && url.startsWith("/deleteGoods")) {
    const id = url.split("/")[2];
    const good = goodsDB.find((el) => el.id === id);
    const goodIndex = goodsDB.findIndex((el) => el.id === good.id);

    if (goodIndex === -1) {
      res.writeHead(404, { "content-type": "application/json" });
      res.end(
        JSON.stringify({
          message: "Not found",
        })
      );
    } else {
      goodsDB.splice(goodIndex, 1);
      writefilefunc(goodsDB);

      res.writeHead(200, { "content-type": "application/json" });
      res.end(
        JSON.stringify({
          message: "Good deleted successfully",
          data: null,
        })
      );
    }
  }
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const http = require("http");
const fs = require("fs");
const PORT = 5000;
const uuid = require("uuid").v4;
const goodsDB = require("./goodsDB2.json");
const { log } = require("console");

const writefilefunc = (data) => {
  fs.writeFile("./goodsDB2.json", JSON.stringify(data), (err, data) => {
    if (err) {
      console.log(err.message);
    } else {
      return data;
    }
  });
};

const server = http.createServer((req, res) => {
  const { method, url } = req;
  if (method === "POST" && url === "/createNewGoods") {
    req.on("data", (data, chunks) => {
      body += chunks;
      console.log(body);
    });
    const { name, instock, unit, unitprice, quantity, totaPrice } = data;

    const newGoods = {
      id: uuid(),
      name,
      instock,
      unit,
      unitprice,
      quantity,
      totaPrice: quantity * unitprice,
    };
  }
  console.log(newGoods);
  goodsDB2.push();
  writefilefunc(goodsDB2);

  res.writeHead(201, { "content-type": "application/json" });
  req.end(
    JSON.stringify({
      message: "Goods created successfully",
      data: newGoods,
    })
  );
});

// Assignment Question:

// > Using only Node.js built-in modules (http, fs, and url), write a server that manages a price list of goods.
// The server should allow users to view all goods, add new goods, update existing goods, and delete goods from the list.

// Each good must include the following properties:

// * id (auto generated with uuid),
// * name (string),
// * inStock (boolean),
// * unit (string, e.g., "1 crate", "1 liter"),
// * unitPrice (number),
// * totalPrice (number), which should be calculated automatically by the server and not provided by the user.

// Store all goods in a local goods.json file and ensure all responses are in JSON format. Do not use Express — only core http Node.js modules.

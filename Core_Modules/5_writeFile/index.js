const http = require("http");
const fs = require("fs");

const port = 3000;
const hostname = 'localhost'

const server = http.createServer((req, res) => {
  const urlInfo = require("url").parse(req.url, true);
  const name = urlInfo.query.name;

  if (!name) {
    fs.readFile("db.html", (err, data) => {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      return res.end();
    });
  } else {
    const nameNewLine = name + ",\r\n";

    fs.appendFile("file.txt", nameNewLine, (err, data) => {
      res.writeHead(302, {
        location: "/",
      });
      return res.end();
    });
  }
});

server.listen(port, hostname, () => {
    const url = `http://${hostname}:${port}`;
    console.log(`Server is running on port: ${port}`);
    console.log(`Click on the following URL to open in your browser: ${url}`);
  });
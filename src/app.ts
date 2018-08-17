import express = require("express");
import jwt = require("jsonwebtoken");

const app = express();

app.get("/api", (req, res) => {
  res.json({
    message: "This is working."
  });
});

app.get("/api/rules", (req, res) => {
  res.json({
    message: "Gotta /login to know the /secret!"
  });
});

app.post("/api/secret", verifyToken, (req, res) => {
  jwt.verify(req.token, "thisisasecret", (err, authData) => {
    if (err) {
      res.json({
        message: "You will never know the secret!"
      });
    } else {
      res.json({
        message: "You now know the secret.",
        authData
      });
    }
  });
});

app.post("/api/login", (req, res) => {
  const user = {
    id: 1,
    username: "john",
    email: "johndoe@gmail.com"
  };

  jwt.sign({ user }, "thisisasecret", { expiresIn: "1h" }, (err, token) => {
    res.json({
      token
    });
  });
});

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (bearerHeader != null) {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.json({
      message: "You will never know the secret!"
    });
  }
}

const port = 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

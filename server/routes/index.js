const express = require("express");
const router = express();
const db = require("../config/db");
const multer = require("multer");
const form_data = multer();

const app = express();
app.use(express.json());
app.use(form_data.array());
app.use(express.urlencoded({ extended: false }));

router.get("/whitelist", (req, res) => {
  db.query(`SELECT * FROM whitelist ORDER BY id DESC`, (error, data) => {
    if (!error) res.send({ data });
    else res.send(error);
  });
});

router.post("/whitelist", (req, res) => {
  console.log(req.body);
  db.query(
    `INSERT INTO whitelist (address) VALUES (?);`,
    [req.body.address],
    (error, result) => {
      if (!error) {
        db.query(
          `SELECT * FROM whitelist WHERE id=?`,
          [result.insertId],
          (error2, data) => {
            if (!error2) res.send(data[0]);
            else res.send(error2);
          }
        );
      } else res.send(error);
    }
  );
});

router.delete("/whitelist/:id", (req, res) => {
  db.query(
    `DELETE FROM whitelist WHERE id=?`,
    [req.params.id],
    (error, result) => {
      console.log(result);
      if (!error) res.send(result);
      else res.send(error);
    }
  );
});

router.get("/airdrop", (req, res) => {
  db.query(`SELECT * FROM airdrop ORDER BY id DESC`, (error, data) => {
    if (!error) res.send({ data });
    else res.send(error);
  });
});

router.post("/airdrop", (req, res) => {
  db.query(
    `INSERT INTO airdrop (type,address) VALUES (?,?);`,
    [req.body.type, req.body.address],
    (error, result) => {
      if (!error) {
        db.query(
          `SELECT * FROM airdrop WHERE id=?`,
          [result.insertId],
          (error2, data) => {
            if (!error2) res.send(data[0]);
            else res.send(error2);
          }
        );
      } else {
        console.log(error);
        res.send(error);
      }
    }
  );
});

router.put("/airdrop", (req, res) => {
  console.log(req.body);
  db.query(
    `UPDATE airdrop SET isAirdrop = 1 WHERE id IN(?);`,
    [req.body],
    (error, result) => {
      console.log(result);
      if (!error) res.send(req.body);
      else res.send(error);
    }
  );
});

router.delete("/airdrop/:id", (req, res) => {
  db.query(
    `DELETE FROM airdrop WHERE id=?`,
    [req.params.id],
    (error, result) => {
      console.log(result);
      if (!error) res.send(result);
      else res.send(error);
    }
  );
});

module.exports = router;

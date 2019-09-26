const express = require("express");
const bookmarkRouter = express.Router();
const bodyParser = express.json();
const winston = require("winston");
const uuid = require("uuid/v4");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [new winston.transports.File({ filename: "info.log" })]
});

const bookmarks = [
  {
    id: 1,
    title: "To Kill a Mocking Bird",
    content: "This is a great book to read"
  },
  {
    id: 2,
    title: "Challenges of coding",
    content: "Explore what is take to understanding code"
  },
  {
    id: 3,
    title: "Life",
    content: "A book about life"
  }
];

bookmarkRouter
  .route("/bookmarks")
  .get((req, res) => {
    // move implementation logic into here
    res.json(bookmarks);
  })
  .post(bodyParser, (req, res) => {
    // move implementation logic into here
    console.log(req);
    const { title, content = [] } = req.body;

    if (!title) {
      logger.error(`Title is Required`);
      return res.status(400).send("Invalid data");
    }
    if (!content) {
      logger.error(`Content is Required`);
      return res.status(400).send("Invalid data");
    }
    const id = uuid();

    const bookmark = {
      id,
      title,
      content
    };
    bookmarks.push(bookmark);

    logger.info(`Bookmarks with id ${id} created`);

    res
      .status(201)
      .location(`http://localhost:8000/bookmarks/${id}`)
      .json(bookmark);
  });

bookmarkRouter
  .route("/bookmarks/:id")
  .get((req, res) => {
    // move implementation logic into here
    const { id } = req.params;
    const bookmark = bookmarks.find(b => b.id == id);

    if (!bookmark) {
      return res.status(404).send("Bookmark not found");
    }
    res.json(bookmarks);
  })
  .delete((req, res) => {
    // move implementation logic into here
    const { id } = req.params;

    const bookmarkIndex = bookmarks.findIndex(b => b.id == id);

    if (bookmarkIndex === -1) {
      logger.error(`Card with id ${id} not found.`);
      return res.status(404).send("Not found");
    }

    bookmarks.splice(bookmarkIndex, 1);

    logger.info(`Bookmark with id ${id} deleted.`);

    res.status(204).end();
  });

module.exports = bookmarkRouter;

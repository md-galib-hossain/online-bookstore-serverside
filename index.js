const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
require("dotenv").config();
const cors = require("cors");
const port = process.env.PORt || 5000;

// middleware
app.use(cors());
app.use(express.json());
console.log(process.env.DB_USER);

// connect database

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.fkxltzv.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const bookCollection = client.db("online-book-reader").collection("books");

    const categoryCollection = client
      .db("online-book-reader")
      .collection("categories");
    // Load All Books
    app.get("/books", async (req, res) => {
      const query = {};
      const cursor = bookCollection.find(query);
      const books = await cursor.toArray();
      res.send(books);
    });
    // Load single book
    app.get("/books/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const cursor = bookCollection.find(query);
      const books = await cursor.toArray();
      res.send(books);
    });
    //Load Category
    app.get("/category", async (req, res) => {
      const query = {};
      const cursor = categoryCollection.find(query);
      const category = await cursor.toArray();
      res.send(category);
    });
    //Load books by Category kaj baki
    app.get("/category/:id", async (req, res) => {
      const id = parseInt(req.params.id);

      const cursor = bookCollection.find({ idno: id });
      const category = await cursor.toArray();
      res.send(category);
    });
    // deleete book
    app.delete("/delete/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await bookCollection.deleteOne(query);
      res.send(result);
    });
    // admin book
    app.get("/adminsinglebook/:id", async (req, res) => {
      const id = req.params.id;

      const query = { _id: ObjectId(id) };
      const book = await bookCollection.findOne(query);
      // const book = await cursor.toArray();
      res.send(book);
    });
    // update book
    app.put("/updatebook/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: ObjectId(id) };

      const book = req.body;
      const newname = book.name;
      const newbody = book.body;

      const updatedbook = {
        $set: {
          name: newname,
          body: newbody,
        },
      };
      const result = await bookCollection.updateOne(filter, updatedbook);
      res.send(result);
    });
    // add book
    app.post("/adminaddbook", async (req, res) => {
      const book = req.body;
      const result = await bookCollection.insertOne(book);
      res.send(result);
    });
  } finally {
  }
}
run().catch((err) => console.log(err));
//

app.listen(port, () => {
  console.log("server running on port:", port);
});

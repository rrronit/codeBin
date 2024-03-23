import express from "express"
import { addSnippet, getAllSnippets,} from "./controller";
const cors = require("cors");
const app = express()
require("dotenv").config();

app.use(cors({ origin: "*" }));
app.use(express.json());




app.post("/add",addSnippet)

app.get("/getAll",getAllSnippets)



app.listen(5000, () => {
    console.log("server started")
})
import express from "express";
import cors from "cors";
import morgan from "morgan";
import router from "./routes/index.js";
import EURouter from "./routes/eu.js";
import NArouter from "./routes/na.js";
import ASrouter from "./routes/as.js";
import companyRouter from "./routes/company.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use('/', router);
app.use('/eu', EURouter);
app.use('/na', NArouter);
app.use('/as', ASrouter);
app.use('/company', companyRouter);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import uiRoute from './ui/ui.route.js';
import pageRoute from './page/page.route.js';
import assetRoute from './assets/assets.route.js';
import projectRoute from './project/project.route.js';
import renderHtml from './render/render.controller.js';



//Initialize App
const app = express();
app.use(express.json());
const corsOptions = {
  origin: function (origin, callback) {
    callback(null, true);
  },
};

corsOptions.credentials = true;
app.use(cors(corsOptions));

//HTML and Static file
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/resources', express.static(path.join(__dirname, 'public')));

//the dir code solve here
app.set('views', `views`);
app.set('view engine', 'hbs');

const mongoUri = 'mongodb+srv://Amit:Amit@cluster0.kayx0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(
  mongoUri,
  {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log('Connected to MongoDB');
  },
);
app.use('/api/projects', projectRoute);
app.use('/api/pages', pageRoute);
app.use('/api/assets', assetRoute);
app.use('/api/', uiRoute);
app.get('/:pageId?', renderHtml);

const PORT = process.env.APP_PORT || 8080;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});

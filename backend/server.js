const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const Url = require('./models/url');
const shortid = require('shortid');
const validUrl = require('valid-url');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('Mongo connection error:', err));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/api/shorten', async (req, res) => {
  const { longurl } = req.body;

  if (!longurl) {
    return res.status(400).json({ error: "Missing URL" });
  }

  if (!validUrl.isWebUri(longurl)) {
    return res.status(400).json({ error: "Invalid URL" });
  }

  const shortcode = shortid.generate();
  const newurl = new Url({ shortcode, longurl });
  await newurl.save();

  res.json({ shortcode, shortURL: `${process.env.BASE_URL}/${shortcode}` });
});


app.get('/:shortcode', async (req, res) => {
  try {
    const { shortcode } = req.params; 

    
    const urlDoc = await Url.findOneAndUpdate(
      { shortcode },
      { $inc: { visitcount: 1 } }, 
      { new: true } 
    );

    if (!urlDoc) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    
    res.redirect(urlDoc.longurl);

  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

app.get('/api/stats/:shortcode', async (req, res) => {
  try {
    const { shortcode } = req.params;
    const doc = await Url.findOne({ shortcode });
    if (!doc) return res.status(404).json({ error: 'Shortcode not found' });

    res.json({
      shortcode: doc.shortcode,
      longurl: doc.longurl,
      visitcount: doc.visitcount
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/all', async (req, res) => {
  try {
    const urls = await Url.find().sort({ _id: -1 }); // newest first
    res.json(urls);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.delete('/api/delete/:shortcode', async (req, res) => {
  try {
    const { shortcode } = req.params;
    const result = await Url.deleteOne({ shortcode });
    if (result.deletedCount === 0) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});


app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
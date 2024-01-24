const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost/moodDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

const moodSchema = new mongoose.Schema({
  mood: String,
  timestamp: { type: Date, default: Date.now }
});

const Mood = mongoose.model('Mood', moodSchema);

app.post('/mood', async (req, res) => {
  const newMood = new Mood({ mood: req.body.mood });
  await newMood.save();
  res.send('Mood saved');
});

app.get('/mood', async (req, res) => {
  const moods = await Mood.find();
  res.json(moods);
});

app.delete('/mood', async (req, res) => {
  try {
    await Mood.deleteMany({});
    res.status(200).send('All moods cleared');
  } catch (error) {
    res.status(500).send('Server error');
    console.error('Error:', error);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

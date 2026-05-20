const express = require('express');
const cors = require('cors');
const connectToMongo = require('./db');
const app = express();

app.set('view engine','ejs')
app.use(express.static('public'))

const PORT = process.env.PORT || 8181;

app.use(express.json());
app.use(cors({
  origin: ["https://med-appt-black.vercel.app", "http://localhost:5173", "http://localhost:4173"]
}));

connectToMongo();

app.use('/api/auth', require('./routes/auth'));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});

// Keep Render awake - ping every 14 minutes
setInterval(() => {
    fetch('https://med-appt.onrender.com')
        .then(() => console.log('Keeping server alive...'))
        .catch(() => {});
}, 840000);

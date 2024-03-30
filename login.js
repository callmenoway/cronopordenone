const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const basicAuth = require('express-basic-auth');
dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: true }));

// Set up multer for file uploads
const upload = multer({ dest: 'public/uploads/' });

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username === process.env.USERNAME && password === process.env.PASSWORD) {
        res.sendFile(path.join(__dirname, 'public', 'upload.html'));
    } else {
        res.send('Invalid credentials.');
    }
});

app.get('/upload.html', basicAuth({
    users: { 'noway': '2134' },
    challenge: true,
    realm: 'Imb4T3st4pp',
}), (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'protected-page.html'));
});


// Modifica la configurazione di multer per accettare più file
app.post('/upload', upload.array('pdfs'), (req, res) => {
    const title = req.body.title;
    const files = req.files;

    // Rinomina i file con i loro nomi originali
    files.forEach(file => {
        fs.renameSync(file.path, path.join(file.destination, file.originalname));
    });

    // Scrivi il titolo e i nomi dei file in un file JSON
    fs.writeFileSync('public/data.json', JSON.stringify({ title, files: files.map(file => file.originalname) }));

    res.redirect('/');
});

// Aggiungi una nuova rotta per cancellare tutti i file
app.post('/delete', (req, res) => {
    const data = JSON.parse(fs.readFileSync('public/data.json'));

    data.files.forEach(file => {
        fs.unlinkSync(path.join('public/uploads', file));
    });

    fs.writeFileSync('public/data.json', JSON.stringify({ title: '', files: [] }));

    res.redirect('/upload.html');
});
console.log('username: ', process.env.USERNAME);
console.log('password: ', process.env.PASSWORD);
app.listen(3000, () => console.log('Server started on port 3000'));
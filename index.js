import express from 'express';
import fs from 'fs';
import path from 'path';

const app = express();
const port = 3000;

app.use(express.json());

app.use(express.static('public'));

app.get('/data', (req, res) => {
    fs.readFile(path.join('./database/', 'data.json'), 'utf8', (err, data) => {
        if (err) {
            console.error("Error occured during reading file:", err);
            res.status(500).send('Error occured during reading file.');
        } else {
            res.json(JSON.parse(data));
        }
    });
});

app.post('/data', (req, res) => {
    
    const newData = req.body;  // Új adatok, amiket a kérés küld

    // Az adatok mentése a data.json fájlba
    fs.writeFile(path.join('./database/', 'data.json'), JSON.stringify(newData, null, 2), 'utf8', (err) => {
        if (err) {
            console.error("An error occured during writeing file:", err);
            res.status(500).send('An error occured while saving data.');
        } else {
            res.status(200).send('Data succesfully changed.');
        }
    });
});

app.listen(port, () => {
    console.log(`Runs on: http://localhost:${port}`);
});
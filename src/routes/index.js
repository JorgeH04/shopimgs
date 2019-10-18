const express = require('express');
const router = express.Router();


const path = require('path');
const { unlink } = require('fs-extra');

const Image = require('../models/Image');


router.get('/', async (req, res) => {
    const images = await Image.find();
    res.render('index', { images }); 
});

router.get('/upload', (req, res) => {
    res.render('upload');
});

router.post('/upload', async (req, res) => {
    const image = new Image();
    image.product = req.body.product;
    image.price = req.body.price;
    image.filename = req.file.filename;
    image.path = '/img/uploads/' + req.file.filename;
    image.originalname = req.file.originalname;
    image.mimetype = req.file.mimetype;
    image.size = req.file.size;

    await image.save();
    res.redirect('/');
});

router.get('/image/:id', async (req, res) => {
    const { id } = req.params;
    const image = await Image.findById(id);
    res.render('profile', { image });
});

router.get('/image/:id/delete', async (req, res) => {
    const { id } = req.params;
    const imageDeleted = await Image.findByIdAndDelete(id);
    await unlink(path.resolve('./src/public' + imageDeleted.path));
    res.redirect('/');
});

router.post('/add/:id', async (req, res) => {
    const imagen = new Image();
    imagen.product = req.body.product;
    imagen.price = req.body.price;

    await imagen.save();
    res.render('add');

    
});





module.exports = router;

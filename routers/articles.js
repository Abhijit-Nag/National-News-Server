const Article = require('../models/Article');
const Headlines = require('../models/Headlines');

const router = require('express').Router();

router.get('/news', async (req, res) => {
    try {
        const articles = await Article.find({});
        res.status(200).json({ success: true, data: articles });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/headlines', async (req, res) => {
    try {
        const articles = await Headlines.find({});
        res.status(200).json({ success: true, data: articles });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

module.exports = router;
module.exports = (app) => {
    const lyrics_controller = require('../controllers/lyrics.controller');
    var router = require('express').Router();

    router.post('/', lyrics_controller.create);
    router.put('/:id', lyrics_controller.update);
    router.get('/', lyrics_controller.findAll);
    router.delete('/', lyrics_controller.deleteAll);
    router.get('/:category', lyrics_controller.findByCategory);

    app.use('/api/lyrics', router);
};
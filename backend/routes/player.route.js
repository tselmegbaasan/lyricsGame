module.exports = (app) => {
    const player_controller = require('../controllers/players.controller');
    var router = require('express').Router();

    router.post('/', player_controller.create);
    router.get('/', player_controller.findAll);
    router.put('/:id', player_controller.update);
    router.delete('/:id', player_controller.delete);
    router.delete('/', player_controller.deleteAll);

    app.use('/api/players', router)
};
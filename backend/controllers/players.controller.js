const db = require('../models/index');
const Player = db.players;
const Op = db.Sequelize.Op;


exports.create = (req, res) => {
    const username = req.body.username;
    const score = 0;

    if (!username) {
        res.status(400).send({
            message: "Content cannot be empty"
        });
        return;
    };

    const player = {
        username: username,
        score: score
    }

    Player.create(player)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating a new player."
            })
        });
}

exports.findAll = (req, res) => {
    const username = req.query.username;
    var condition = username ? { username: { [Op.like]: `%${username}%}` } } : null;

    Player.findAll({ where: condition })
        .then((data) => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving all players."
            });
        });
}

exports.update = (req, res) => {
    const id = req.params.id;

    Player.update(req.body, {
        where: { id: id }
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: `Player with id:${id} was successfully updated.`
                })
            } else {
                res.send({
                    message: "Cannot update player with id: " + id
                })
            };
        })
        .catch(err => {
            res.status(500).send({
                message: "An error occurred while updating player with id: " + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    Player.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: `Player with id: ${id} was successfully deleted.`
                })
            } else {
                res.send({
                    message: "Couldn't delete player with id:" + id + ", can be due to the player not existing."
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Couldn't delete player with id: " + id
            });
        });
};

exports.deleteAll = (req, res) => {
    Player.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({
                message: `${nums} players were successfully deleted.`
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while deleting all players."
            });
        });
};

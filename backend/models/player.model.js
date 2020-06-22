module.exports = (sequelize, Sequelize) => {
    const Player = sequelize.define("player", {
        username: {
            type: Sequelize.STRING
        },
        score: {
            type: Sequelize.INTEGER
        }
    });
    return Player;
}

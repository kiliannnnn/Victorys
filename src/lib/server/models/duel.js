import { DataTypes } from 'sequelize';
import sequelize from '$lib/server/sequelize';

const Duel = sequelize.define('Duel', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    tournament_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'tournaments',
            key: 'id',
        },
    },
    player1_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id',
        },
    },
    player2_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id',
        },
    },
    winner_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'users',
            key: 'id',
        },
    },
    status: {
        type: DataTypes.ENUM('pending', 'in progress', 'completed', 'cancelled'),
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'duels',
    timestamps: true,
});

export default Duel;

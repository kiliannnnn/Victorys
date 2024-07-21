import { Model, DataTypes } from 'sequelize';
import sequelize from '$lib/server/sequelize';

class User extends Model {
}

User.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: crypto.randomUUID,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
    country: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    token: {
        type: DataTypes.DECIMAL(17, 5),
        defaultValue: 0,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        onUpdate: DataTypes.NOW,
    },
}, {
    sequelize,
    tableName: 'users',
    timestamps: true,
});

User.getLeaderboard = async function () {
    return await User.findAll({
        order: [['token', 'DESC']],
        limit: 10,
    });
};

export default User;

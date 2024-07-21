import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('victorys', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
});

export default sequelize;

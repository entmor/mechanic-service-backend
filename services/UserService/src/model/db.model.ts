import { DataTypes, Optional, ModelAttributes, ModelOptions, Model } from 'sequelize';
import { GenderGrpc } from '../../../../interface/gender';
import { User } from '../../../../interface/user';

type UserCreationAttributes = Optional<Omit<User<GenderGrpc>, 'createdAt' | 'updatedAt'>, 'id'>;

export interface UserInstance
    extends Model<User<GenderGrpc>, UserCreationAttributes>,
        User<GenderGrpc> {}

const modelName = 'Users';

const attributes: ModelAttributes = {
    firstname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    salt: {
        type: DataTypes.STRING(64),
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    gender: {
        type: DataTypes.ENUM('1', '2', '3'),
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    street: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    zipCode: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    city: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    country: {
        type: DataTypes.STRING(3),
        allowNull: true,
    },
    birthday: {
        type: DataTypes.DATEONLY,
        allowNull: true,
    },
    activatedKey: {
        type: DataTypes.STRING,
        allowNull: true,
    },
};

const options: ModelOptions = {
    tableName: 'users',
};

export { modelName, attributes, options };

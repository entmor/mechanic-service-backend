import { Sequelize, ModelAttributes, ModelOptions, Model } from 'sequelize';
import { extend } from 'joi';

export interface DefineOptions {
    tableName?: string | undefined;
}

export interface ItemModel {
    modelName: string;
    attributes: ModelAttributes;
    options?: ModelOptions;
}

// TODO any = Model
interface Models {
    [key: string]: any;
}

export class SequelizeInit<T extends Model> {
    private sequelize: Sequelize;
    private models: Models = [];

    constructor(ModelsDefined: ItemModel[]) {
        this.initSequelize();

        ModelsDefined.forEach((item: ItemModel) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            this.models[item.modelName] = this.sequelize.define<T>(
                item.modelName,
                item.attributes,
                item.options
            );
        });

        this.isConnected();
    }

    private initSequelize(): void {
        this.sequelize = new Sequelize(
            process.env.MYSQL_DATABASE,
            process.env.MYSQL_USER,
            process.env.MYSQL_PASSWORD,
            {
                host: process.env.MYSQL_HOST,
                dialect: 'mysql',
            }
        );
    }

    private isConnected(): void {
        this.sequelize
            .authenticate()
            .then(() => {
                console.log('Connection has been established successfully.');
                this.sync();
            })
            .catch((err) => {
                console.error('Unable to connect to the database:', err);
            });
    }

    getModel(name: string) {
        return this.models[name];
    }

    private sync(force = false): void {
        this.sequelize.sync({ force });
    }
}

import { Repair } from '../../../../interface/repair.interface';
import { JoiSchema } from '../../../../interface/joi.interface';
import Joi from 'joi';
import { RegExpPatterns } from '../../../../helpers/validate';
import { REPAIR_STATUS, REPAIR_TYPE } from '../config/repair.config';

type RepairSchema = Omit<Repair, 'id'>;

const REPAIR_SCHEMA: JoiSchema<RepairSchema> = {
    type: Joi.string().valid(...REPAIR_TYPE),
    status: Joi.string().valid(...REPAIR_STATUS),
    mileage: Joi.number().integer().min(0),
    vehicleId: Joi.string().pattern(RegExpPatterns.mongoId),
    partsList: Joi.array()
        .items(
            Joi.object({
                name: Joi.string().pattern(RegExpPatterns.name),
                priceBuyNetto: Joi.number().min(0).precision(2).required(),
                priceNetto: Joi.number().min(0).precision(2).required(),
                priceBrutto: Joi.number().min(0).precision(2).required(),
                tax: Joi.number().min(0).precision(2).required(),
                count: Joi.number().integer().positive().required(),
            })
        )
        .min(1),
    // costs: Joi.object({
    //     count: Joi.number().integer().positive().required(),
    //     priceBruttoAll: Joi.number().min(0).precision(2).required(),
    //     priceNettoAll: Joi.number().min(0).precision(2).required(),
    //     taxAll: Joi.number().min(0).precision(2).required(),
    // }),
};

const findRepairFilterSchema: JoiSchema<Repair & { clientId: string }> = {
    ...REPAIR_SCHEMA,
    id: Joi.string().pattern(RegExpPatterns.mongoId),
    clientId: Joi.string().pattern(RegExpPatterns.mongoId),
    createdAt: Joi.string().pattern(RegExpPatterns.number),
    updatedAt: Joi.string().pattern(RegExpPatterns.number),
};

const setRepairSchema: JoiSchema<RepairSchema> = {
    ...REPAIR_SCHEMA,
    type: REPAIR_SCHEMA.type.required(),
    status: REPAIR_SCHEMA.status.required(),
    vehicleId: REPAIR_SCHEMA.vehicleId.required(),
    partsList: REPAIR_SCHEMA.partsList.required(),
    // costs: REPAIR_SCHEMA.costs.required(),
};

const updateRepairSchema: JoiSchema<Repair> = {
    ...REPAIR_SCHEMA,
    id: Joi.string().pattern(RegExpPatterns.mongoId).required(),
};

/** EXPORTS VALIDATORS **/

export const FindRepairFilterValidator = findRepairFilterSchema;

export const SetRepairValidator = Joi.object(setRepairSchema);

export const UpdateRepairValidator = Joi.object(updateRepairSchema);

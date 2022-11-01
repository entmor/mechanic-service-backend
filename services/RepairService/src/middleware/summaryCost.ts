import { RepairCosts, RepairPart } from '../../../../interface/repair.interface';
import { status } from '@grpc/grpc-js';

export async function summaryCost(parts: RepairPart[]): Promise<RepairCosts> {
    try {
        if (parts.length === 0) {
            return {
                countAll: 0,
                priceBruttoAll: 0,
                priceNettoAll: 0,
                taxAll: 0,
            };
        }

        const priceNettoAll = parts
            .map((value) => +value['priceNetto'])
            .reduce((prev, current) => prev + current)
            .toFixed(2);

        const priceBruttoAll = parts
            .map((value) => +value['priceBrutto'])
            .reduce((prev, current) => prev + current)
            .toFixed(2);

        const countAll = parts
            .map((value) => +value['count'])
            .reduce((prev, current) => prev + current);

        return {
            countAll,
            priceNettoAll,
            priceBruttoAll,
            taxAll: (+priceBruttoAll - +priceNettoAll).toFixed(2),
        };
    } catch (error) {
        await Promise.reject({
            code: status.INVALID_ARGUMENT,
            message: error.message || 'summaryCost - ERROR',
        });
    }
}

import { RepairPart } from '../../../../interface/repair.interface';
import { status } from '@grpc/grpc-js';
import { toBrutto } from '../helpers/price';

export async function generatePartListPrices(parts: RepairPart[]): Promise<RepairPart[]> {
    try {
        return parts.map((value) => {
            const prices = generatePrice(value);

            return {
                ...value,
                ...prices,
            };
        });
    } catch (error) {
        await Promise.reject({
            code: status.INTERNAL,
            message: error.message || 'generatePartListPrices ERROR',
        });
    }
}

function generatePrice(part: RepairPart): Partial<RepairPart> {
    return {
        priceNetto: (part.count * +part.priceBuyNetto).toFixed(2),
        priceBrutto: toBrutto(part.count * +part.priceBuyNetto, +part.tax),
    };
}

import { prepareFindFilter } from './middleware/Mongodb/mongodb';
import { FindFilterValidator } from './services/CarService/src/models/validator';
import { Car } from './interface/car';

async function main() {
    prepareFindFilter<Car>(FindFilterValidator(), {
        year: {
            $gte: 1884,
        },
    })
        .then(console.log)
        .catch(console.error);
}

setInterval(function () {
    main();
}, 2500);

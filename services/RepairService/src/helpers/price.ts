export function toBrutto(price: number, tax: number) {
    const procent = 1 + tax / 100;

    return (price * procent).toFixed(2);
}

export function toNetto(price: number, tax: number) {
    const procent = 1 + tax / 100;

    return (price / procent).toFixed(2);
}

import { formatPrice, getFinalPrice, calcTotal, isValidEmail } from './helpers';

describe('Funciones de helpers.js', () => {
    it('formatPrice deja el precio con signo peso y separador de miles', () => {
        expect(formatPrice(12000)).toBe('$12.000');
        expect(formatPrice(0)).toBe('$0');
    });

    it('getFinalPrice usa el precio de oferta solo cuando existe y calcTotal suma precio x cantidad', () => {
        expect(getFinalPrice({ price: 8500, offerPrice: 6900 })).toBe(6900);
        expect(getFinalPrice({ price: 12000, offerPrice: null })).toBe(12000);

        const items = [
            { price: 1000, quantity: 3 },
            { price: 4000, quantity: 1 }
        ];
        expect(calcTotal(items)).toBe(7000);
        expect(calcTotal([])).toBe(0);
    });

    it('isValidEmail solo acepta correos duoc, profesor duoc y gmail', () => {
        expect(isValidEmail('ana@duoc.cl')).toBeTrue();
        expect(isValidEmail('profe@profesor.duoc.cl')).toBeTrue();
        expect(isValidEmail('ana@gmail.com')).toBeTrue();
        expect(isValidEmail('ana@hotmail.com')).toBeFalse();
        expect(isValidEmail('sin-arroba.cl')).toBeFalse();
    });
});

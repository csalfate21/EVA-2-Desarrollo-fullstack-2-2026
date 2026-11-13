
export function formatPrice(value) {
    return '$' + Number(value).toLocaleString('es-CL');
}


export function getFinalPrice(product) {
    return product.offerPrice ? product.offerPrice : product.price;
}

export function calcTotal(items) {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

// solo se aceptan correos duoc, profesor duoc y gmail (la misma regla de la EP1)
export function isValidEmail(email) {
    return /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i.test(email.trim());
}

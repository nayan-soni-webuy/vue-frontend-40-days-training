// account number 4-4 k gorups me: "0000000000000000" -> "0000 0000 0000 0000"
function formateAccountNumber(number) {
    const digits = String(number).replace(/\D/g, ''); //remove letters...

    let result = '';

    for(let i = 0 ; i < digits.length ; i++) {
        if(i > 0 && i % 4 === 0) {
            result = result + ' ';
        }
        result = result + digits[i];
    }

    return result;
}

//  350.00 -> "£350.00"
const formatPrice = (amount, currency = '£') => { //default currency is uk
    return currency + Number(amount).toFixed(2);
};

// URL k lie : "Xbpx Series S Console!" -> "xbox-series-s-console"
const slugify = (text) => {
    return text.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
};

// "2026-11-01" -> readable date... for blog cards... 
const formateDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
        weekday: 'long',
        day: 'numeric',
        month: 'short',
        year: 'numeric',    
    });
};
// ########### day 6 js exercises ###########

// ^^^^^^^^ 1. search prodcct ^^^^^^^^^^^ 

// products [{name: , category: }, ...]
function searchProducts(products, searchText) {
    
    const text = searchText.trim().toLowerCase();
    const results = [];

    // if search box is empty tab kuch return ni krege
    if(text === '') {
        return results;
    }

    for(let i = 0; i < products.length; i++) {
        const name = products[i].name.toLowerCase();
        const category = products[i].category.toLowerCase();

        // name or catgory me product mila so psuh in results 
        if(name.includes(text) || category.includes(text)) {
            results.push(products[i]);
        }
    }

    return results;
}

// ^^^^^^^^ 2. signup form validation  ^^^^^^^^^^^ 
// step 1 multiple fields check krna h... ik obj pas krege
function validateSignup(values) {

    const errors = {};
    let errorCount = 0;

    // validate firts and last name 
    if(values.firstName.trim().length < 2) {
        errors.firstName = 'First name must be at least 2 characters..';
        errorCount++;
    }
    if(values.lastName.trim().length < 2) {
        errors.lastName = 'Last name must be at least 2 characters!';
        errorCount++;
    }

    // email validate using positon 
    const email = values.email.trim();
    const atPosition = email.indexOf('@');
    const lastDot = email.lastIndexOf('.');

    if(email === '') {
        errors.email = 'Email is requried!';
        errorCount++;
    } else if(atPosition < 1 || lastDot < atPosition+2 || lastDot === email.length-1 || email.includes(' ')) {
        errors.email = 'Enter a valid email Adress!!';
        errorCount++;
    }

    // test: password atleast 8 char hona chahuye, 1 char, 1no.. 
    const password = values.password;
    let hasLetter = false;
    let hasNumber = false;

    for(let i = 0; i < password.length; i++) {
        const char = password[i];

        if(char >= '0'  && char <= '9') {
            hasNumber = true;
        } else if((char >='a' && char <= 'z') || (char >= 'A' && char <='Z')) {
            hasLetter = true;
        }

    }

    if(password.length < 8 || !hasLetter || !hasNumber) {
        errors.password = 'password must be alleast 8 characters with one letter & one number!!';
        errorCount++;
    }

    // terms checkbox tick hona chahiye
    if(values.termsAccepted !== true) {
        errors.terms = 'please accept the terms & conditions!!';
        errorCount++;
    }

    return {
        isValid: errorCount === 0,
        errors: errors
    };

}

// ^^^^^^^^ 3. Region settings - uk, es, my...  ^^^^^^^^^^^ 
function getRegionConfig(region) {
    switch(region) {
        case 'es':
            return {
                currency: '€',
                language: 'es',
                freeDeliveryLimit: 100
            };
        case 'my':
            return {
                currency: 'RM',
                language: 'en',
                freeDeliveryLimit: 300
            };
        case 'pt':
            return {
                currency: '€',
                language: 'pt',
                freeDeliveryLimit: 100
            };
        case 'it':
            return {
                currency: '€',
                language: 'it',
                freeDeliveryLimit: 100
            };
        default:
            return {
                currency: '£',
                language: 'en',
                freeDeliveryLimit: 100
            }; //for uk
    }
}


// ^^^^^^^^ 4. get Product Contition grade (A/ B/ C) ^^^^^^^^^^^ 
function getProductConditionLabel(grade) {
    switch(grade.toUpperCase()) {
        case 'A':
            return 'Mint';
        case 'B':
            return 'Goood';
        case 'C':
            return 'Working';
        default:
            return 'Unknown';
    }
}

// ^^^^^^^^ 5. Free Delivery Message(site ka 'Free delivery on iteems over £100') ^^^^^^^^^^^
function getFreeDeliveryMessage(total, freeDeliveryLimit) {
    if(total >= freeDeliveryLimit) {
        return 'You get free delivery!';
    }

    const remaining = Math.round((freeDeliveryLimit - total)*100) /100;
    return 'Add £' + remaining + ' more for free delivery';
} 

// ^^^^^^^^ 6. Basket ka total price^^^^^^^^^^^
// items array of objects pass krege, har item ki price aur quantity ko multiple krke total me add krna h
function calculateBasketTotal(items) {
    let total = 0;

    for(let i = 0; i < items.length; i++) {
        total = total + items[i].price * items[i].quantity;
    }

    return Math.round(total * 100)/100; //2 decimal tak krega
}


// ^^^^^^^^ 7. Check password (strong, weak, medium) ^^^^^^^^^^^
function checkPasswordStrength(password) {

    let score = 0;

    let hasUpperCase = false;
    let hasNumber = false;
    let hasSpecialCharacter = false;

    if(password.length >= 8) 
        score++;
    if(password.length >= 12)
        score++;

    for(let i = 0; i < password.length; i++) {
        const char = password[i];
        
        if(char >= 'A' && char <= 'Z') {
            hasUpperCase = true;
        } else if(char >= '0' && char <= '9') {
            hasNumber = true;
        } else if(!(char >= 'a' && char <= 'z')) {
            hasSpecialCharacter = true; //na letter, na number -> special characyter
        }

    }

    if(hasUpperCase) 
        score++;
    if(hasNumber)
        score++;
    if(hasSpecialCharacter)
        score++;

    if(score <= 2) 
        return 'Week';
    if(score <= 4)
        return 'Medium';
    
    return 'Strong';

}





//######################### function calls 
const sampleProducts = [
    {name : 'Xbox Series S Console', category: 'Gaming'},
    {name: 'Apple iPhone 15 128GB', category: 'Phones'},
    {name: 'Toy Story 3', category: 'Film & TV'},
];
console.log('1. search box:', searchProducts(sampleProducts, 'iphone'));
console.log('2. Create Acc btn', validateSignup({firstName: 'N', lastName: 'Soni', email: 'nayan@', password: '123', termsAccepted: false}));
console.log('3. my region', getRegionConfig('my'));
console.log('4. grade B:', getProductConditionLabel('b'));
console.log('5. delivery:', getFreeDeliveryMessage(75.50, 100)); //(total, freeDeliveryLimit)
console.log('6. Basket total:', calculateBasketTotal([{price: 350, quantity: 1}, {price: 12.50, quantity: 2}]));
console.log('7. Password:', checkPasswordStrength('Nayan#123'));

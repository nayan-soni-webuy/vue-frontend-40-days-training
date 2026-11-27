//here each func returns true/flse, so can be reused
const isNotEmpty = (value) => {
    return value.trim() !== '';
};

// (extension kam se kam 2 letters) 
const isValidEmail = (email) => {
    const pattern = /^[A-Za-z0-9]+([._%+-][A-Za-z0-9]+)*@[A-Za-z0-9]+([.-][A-Za-z0-9]+)*\.[A-Za-z]{2,}$/;
    return pattern.test(email.trim());
};

const isValidPassword = (password) => {
    return password.length >= 8 && /[A-Za-z]/.test(password) && /[0-9]/.test(password);
};

const isValidName = (name) => {
    return /^[A-Za-z][A-Za-z '-]{1,49}$/.test(name.trim());
};

const isValidPhone = (number) => {
    return /^[0-9]{7,15}$/.test(number.trim());
};


//func exp upar ke validatrs ko jodke ik field ka err dega, if no err then return khali string
const getFieldError = function(fieldName, value) {

    if(!isNotEmpty(value)) {
        return 'This Field is Required!';
    }

    if(fieldName === 'firstName' || fieldName === 'lastName') {
        return isValidName(value) ? '' : 'Enter a valid name';
    }

    if(fieldName === 'email') {
        return isValidEmail(value) ? '' : 'Enter a valid email address';
    }

    if(fieldName === 'password') {
        return isValidPassword(value) ? '' : 'Password must be 8+ characters with a letter & a number';
    }

    if(fieldName === 'phone') {
        return isValidPhone(value) ? '' : 'Enter digits only (7 to 15)';
    }

    return ''; //jis field ka rule ni h usme err nahi

};


function validate (inputData) {
    let errors = {
        name:"",
        lastName:"",
        email:"",
        message:""
    }
    if (!inputData.name) {
        errors.name = "Name required";
    } else if (/\d/.test(inputData.name)) {
        errors.name = "invalid Name format";
    }

    if (!inputData.lastName  ){
        errors.lastName = "lastName required"
    } else if (/\d/.test(inputData.lastName)) {
        errors.lastName = "invalid Last Name format";
    }


    if (!inputData.email) {
        errors.email = "email required";
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(inputData.email)) {
          errors.email = "invalid email format";
        }
      }
    if (!inputData.message) {
        errors.message = "message required";
    } else if (!/^.{11,}$/.test(inputData.message)) {
        errors.message = "message must be longer than 10 characters";
    }
    return errors
}

export default validate;
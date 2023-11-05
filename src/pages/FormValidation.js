
function validate (inputData) {
    let errors = {}
    if(!inputData.name){
        errors.name = "Name required"
    } else if (!inputData.lastName  ){
        errors.lastName = "lastName required"
    } else if (!inputData.email  ){
        errors.email = "email required"
    } else if (!inputData.message  ){
        errors.message = "message required"
    } 
    return errors
}

export default validate;
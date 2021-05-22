module.exports = {
  userAccountValidation: (req) => {
    const { firstName, lastName, email,  password } = req.body
    let firstNameValid = firstName.match(/^[A-Za-z]+$/) && firstName !== null && firstName !== "";
    let lastNameValid = lastName.match(/^[A-Za-z]+$/) && lastName !== null && lastName !== "";
    let emailValid = email.match(/[^@]+@[^]+\..+/) && email !== null && email !== "";
    let passwordValid = password !== null && password !== "";

    if(!firstNameValid){
      return "First name format invalid"
    } else if (!lastNameValid) {
      return "Last name format invalid"
    } else if (!emailValid){
      return "Email format invalid"
    } else if (!passwordValid) {
      return "Password format invalid"
    } else {
      return true
    }
  },
  signUpValidation: (req) => {
    const { email, password } = req.body
    let emailValid = email.match(/[^@]+@[^]+\..+/) && email !== null && email !== "";
    let passwordValid = password !== null && password !== "";

    if (!emailValid){
      return "Email format invalid"
    } else if (!passwordValid) {
      return "Password format invalid"
    } else {
      return true
    }
  }
}

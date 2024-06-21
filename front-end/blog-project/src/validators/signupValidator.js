const isEmail = (email) =>
  String(email)
    .toLowerCase()
    .match(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    );

    const signupValidator = ({ name, email, password, confirmPassword }) => {

        const errors = {
            name: "",
            email: "",          
            password: "",
            confirmPassword: "",
        };

        if (!name) {
            errors.name = "Name is required";
        }

        if (!email) {
            errors.email = "Email is required";
        } else if (!isEmail(email)) {
            errors.email = "Invalid email";
        }

        if (!password) {
            errors.password = "Password is required";
        } else if (password.length < 6) {
            errors.password = "Password must be at least 6 characters";
        }   

        if(password !== confirmPassword){
            errors.confirmPassword = "Passwords do not match";
        }

        return errors;
    }

    export default signupValidator;
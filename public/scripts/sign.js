 function change()
    {
        document.getElementById("signin").style.display="none";
        document.getElementById("signup").style.display="grid";
        document.getElementById("signup").style.placeContent="center"; 
    }
    function validateEmail(email) {
        if (!/\S+@\S+\.\S+/.test(email)) {
          document.getElementById("errormail").innerHTML="Please enter a valid email address.";
          return false;
        }
        return true;
      }
      
      function validatePassword(password) {
        if (password.length < 8) {
          document.getElementById("errorpassword").innerHTML="Password must be at least 8 characters long.";
          return false;
        } else if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/.test(password)) {
          document.getElementById("errorpassword").innerHTML="Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character.";
          return false;
        }
        return true;
      }
      
      function validateConfirmPassword(password, cpassword) {
        if (password !== cpassword) {
          document.getElementById("pwcErr").innerHTML="Passwords do not match.";
          return false;
        }
        return true;
      }
      
      function validateAge(dob) {
        let today = new Date();
        let birthDate = new Date(dob);
        let age = today.getFullYear() - birthDate.getFullYear();
        let m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        if (age < 18) {
          document.getElementById("errordate").innerHTML="You must be at least 18 years old to sign up.";
          return false;
        }
        return true;
      }
      
      function validate(form) {
        // Get form values
        let email = form.mail.value.trim();
        let password = form.password.value;
        let cpassword = form.cpassword.value;
        let dob = form.dat.value;
        let gender = form.querySelector('input[name="gender"]:checked');
        
        let fail = false;
        
        // Validate Email
        if (!validateEmail(email)) {
          fail = true;
        }
        
        // Validate Password
        if (!validatePassword(password)) {
          fail = true;
        }
        
        // Validate Confirm Password
        if (!validateConfirmPassword(password, cpassword)) {
          fail = true;
        }
        
        // Validate Age
        if (!validateAge(dob)) {
          fail = true;
        }
        
        if (fail) {
          return false;
        } else {
          return true;
        }
      }
      
      
   
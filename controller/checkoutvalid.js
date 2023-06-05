
function isValidPhoneNumber(phone) {
    // Remove any non-digit characters from the phone number
    const sanitizedPhone = phone.replace(/\D/g, '');
  
    // Check if the sanitized phone number matches the desired pattern
    const phonePattern = /^\d{11}$/; // Assuming an 11-digit phone number is required
    return phonePattern.test(sanitizedPhone);
  }


  function isValidCVV(cvv) {
    // Check if the CVV is a 3-digit number
    const cvvRegex = /^\d{3}$/;
    return cvvRegex.test(cvv);
  }
  
  const checkoutvalidation = (req, res) => {

  const Fname = req.body.Fname;
  const Lname = req.body.Lname;
  const phone = req.body.phone;
  const country = req.body.country;
  const city = req.body.city;
  const street = req.body.street;
  const building = req.body.building;
  const floor = req.body.floor;
  const cardN = req.body.cardN;
  const card = req.body.card;
  const date = req.body.date;
  const cvv = req.body.cvv;
  
   
    let errors = {};
  
    if (!Fname) {
      errors.Fname = "First name is required";
    }
  
    if (!Lname) {
      errors.Lname = "Last name is required";
    }
  
    if (!phone) {
      errors.phone = "Phone number is required";
    } else if (!isValidPhoneNumber(phone)) {
      errors.phone = "Invalid phone number";
    }
  
    if (!country) {
      errors.country = "Country is required";
    }


    if (!city) {
        errors.city = "City is required";
      }
    
      if (!street) {
        errors.street = "Street is required";
      }
    
      if (!building) {
        errors.building = "Building number is required";
      }
    
      if (!floor) {
        errors.address = "Floor number is required";
      }
    
      if (!cardN) {
        errors.cardN = "Name on card is required";
      }
    
      if (!card) {
        errors.card = "Card number is required";
      } else if (!isValidCardNumber(card)) {
        errors.card = "Invalid card number";
      }

      if (!cvv) {
        errors.cvv = "CVV is required";
      } else if (!isValidCVV(cvv)) {
        errors.cvv = "Invalid CVV";
      }
  
    
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors });
    }
  
  
  
    res.status(200).json({ message: "Payment successful" });
  }
  


 
export default checkoutvalidation
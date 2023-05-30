import mongoose from "mongoose";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;
const SALT_WORK_FACTOR = 10;

const SignupSchema = new Schema({
  fullname: { 
    type: String,
    required: true          
  },
  mail: { 
    type: String,
    required: true,
    match: [/\S+@\S+\.\S+/, "is invalid"],
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8 // Minimum length of the password
  },
  cpassword: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return value === this.password; // Validate if cpassword matches password
      },
      message: "Passwords do not match."
    }
  },
  age: {
    type: Number, // Changed the data type to Number
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  cart: [{

      product_id: {
        type: String
      }
  }],
  wishlist:[{

    product_id: {
      type: String
    }
}],
  orderlist:[{

    order_id: {
      type: String
    }
}],
}, { timestamps: true });




SignupSchema.pre("save", function(next) {
  const user = this;
  if (!user.isModified('password')) return next();
  /* bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  }); */
  next();
});

const user = this;
SignupSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, user.password, function(err, isMatch) {
    if (err) return cb(err);
    if (isMatch) {
      console.log("Sign-in successful. Password matches!");
      cb(null, isMatch);
    } else {
      console.log("Sign-in failed. Password does not match!");
      cb(null, false);
    }
  });
};

SignupSchema.methods.compareEmail = function(candidateEmail, cb) {
  if (candidateEmail === user.email) {
    console.log("Email authentication successful. Email matches!");
    cb(null, true);
  } else {
    console.log("Email authentication failed. Email does not match!");
    cb(null, false);
  }
};



// Create a model based on that schema
const Signup = mongoose.model("Signup",SignupSchema);
// export the model
//module.exports=Signup
export default Signup

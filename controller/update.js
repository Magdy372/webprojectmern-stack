import { MongoClient, ObjectId } from "mongodb";
import bcrypt from 'bcrypt';


function validateSignup(){
  let fail=false;

  if (!/\S+@\S+\.\S+/.test(req.body.mail)){
    fail=true;
  }

  if (req.body.password.length < 8) {
    
    fail=true;
  } else if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/.test(req.body.password)) {
    fail=true;

  }

  if (req.body.password !== req.body.cpassword) {
    fail=true;
    
  }

  if(fail===true){
    console.log("there is error in password or email");
    return false;
  }
  else{
return true;
  }
}





const updateusers = async (req, res) => {

  const password = req.body.password;
  const cpassword=req.body.cpassword;

  const hashedPassword = bcrypt.hashSync(password, 10);
  const hashedcPassword = bcrypt.hashSync(cpassword, 10);

if(validateSignup){
  try {
    const client = await MongoClient.connect("mongodb+srv://ahmed2110223:Bi1rExHxs1QSCUpP@webproject.fve9yw3.mongodb.net/test?retryWrites=true&w=majority");
    const db = client.db('test');
    console.log(req.session.user._id.toString())
    console.log(req.body.fullname)
    const result = await db.collection('signups').updateOne(
        { _id: new ObjectId(req.session.user._id.toString()) },
        { $set: { fullname: req.body.fullname,mail: req.body.mail,password: hashedPassword, cpassword: hashedcPassword }}
      );
      
    client.close();

    if (result.modifiedCount > 0) {
      res.redirect('/');
      
    } else {
      res.send('No user data updated');
    }
  } catch (error) {
    console.error('Error updating user data:', error);
    res.status(500).send('Server error');
  }
}

}


/*const signupform = async (req,res)=>{
  //const signup =new Signup(req.body)
    

    const sign = new Signup ({
        fullname: req.body.fullname,
        mail: req.body.mail,
        password: req.body.password,
        cpassword: req.body.cpassword,
      });

      console.log(req.body)
   sign.save()
    .then( result => {
        res.redirect("/")
    })
    .catch( err => {
        console.log(err)
    })
}*/


export default updateusers
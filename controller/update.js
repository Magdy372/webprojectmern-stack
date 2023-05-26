import { MongoClient, ObjectId } from "mongodb";



const updateusers = async (req, res) => {
  try {
    const client = await MongoClient.connect("mongodb+srv://ahmed2110223:Bi1rExHxs1QSCUpP@webproject.fve9yw3.mongodb.net/test?retryWrites=true&w=majority");
    const db = client.db('test');
    console.log(req.session.user._id.toString())
    console.log(req.body.fullname)
    const result = await db.collection('signups').updateOne(
        { _id: new ObjectId(req.session.user._id.toString()) },
        { $set: { fullname: req.body.fullname,mail: req.body.mail,password: req.body.password, cpassword: req.body.cpassword }}
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
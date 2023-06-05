import { Router } from 'express';
import session from 'express-session';
import { MongoClient, ObjectId } from "mongodb";
import bcrypt from 'bcrypt';
import edituser from "../models/signup_schema.js"

var router = Router();

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
  


/* GET /about page. */
router.post('/', async function(req, res, next) {
   

      /*  const password = req.body.password;
        const cpassword=req.body.cpassword;
      
        const hashedPassword = bcrypt.hashSync(password, 10);
        const hashedcPassword = bcrypt.hashSync(cpassword, 10);*/
        if (req.session && req.session.user && req.session.user.Type === 'admin') {
      
      if(validateSignup){
        try {
          const client = await MongoClient.connect("mongodb+srv://ahmed2110223:Bi1rExHxs1QSCUpP@webproject.fve9yw3.mongodb.net/test?retryWrites=true&w=majority");
          const db = client.db('test');
          //console.log(req.session.user._id.toString())
          console.log(req.body.fullname)
          const result = await db.collection('signups').updateOne(
              { _id: new ObjectId(req.body._id) },
              { $set: { fullname: req.body.fullname,mail: req.body.mail,Type: req.body.Type }}
            );
            
          client.close();
      
          if (result.modifiedCount > 0) {
            res.redirect('/dashborad',{ user: (req.session.user === undefined ? "" : req.session.user) });
            
          } else {
            res.send('No user data updated');
          }
        } catch (error) {
          console.error('Error updating user data:', error);
          res.status(500).send('Server error');
        }
      }
     
      }
      else{
        res.render("noaccess",{ user: (req.session.user === undefined ? "" : req.session.user) })
      }
});


router.get("/change/:id", async function(req, res, next) {
  if (req.session && req.session.user && req.session.user.Type === 'admin') {
    let client;
    try {
        // Create a new MongoClient
        client = new MongoClient("mongodb+srv://ahmed2110223:Bi1rExHxs1QSCUpP@webproject.fve9yw3.mongodb.net/test?retryWrites=true&w=majority", { useUnifiedTopology: true });
    
        // Connect to the MongoDB database
        await client.connect();
    
        // Access the specific collection
        const collection = client.db('test').collection('signups');
    
        // Convert the ID string to an ObjectId
        const objectId = new ObjectId(req.params.id);
    
        // Delete the document by ID
        const result = await collection.deleteOne({ _id: objectId });
    
        if (result.deletedCount === 1) {
          console.log('Document deleted successfully');
          res.redirect('/dashborad');
        } else {
          console.log('Document not found');
        }
    
      } catch (error) {
        console.error('Error deleting document:', error);
      } finally {
        // Close the connection
        client.close();
      }
    }
    else{
      res.render("noaccess",{ user: (req.session.user === undefined ? "" : req.session.user) })
    }
  });

/* GET /about/test page. */
router.get('/test', function(req, res, next) {
    res.send('Test Route');
  });

export default router;
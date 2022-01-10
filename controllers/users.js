const {user} = require("../models");

const bcrypt = require('bcrypt');
const saltRounds = 10;   
const Users = user;
//===============================
  exports.islogin = async(req, res) => {
      if (!req.body.Email && !req.body.Password) {
         return res.json({success:false, error: `Email Password can not be empty!` });
      }
      let Email = req.body.Email;
      let Password = req.body.Password;
        try {
          const response = await Users.findOne({ where: { Email: Email },raw:true})
          console.log(' Users.findOne response >>',response);
          if (response) {
            const passcomparison = await bcrypt.compare(Password,response.Password);
            if(passcomparison){
              response.token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
              res.json({success:true, result: response })
            }
            else{
              res.json({success:false, error: `Cannot find with password : ${Password}.` })
            }
          } else {
            res.json({success:false, error: `Cannot find with Email=${Email}.` })
          }
        } catch (error) {
          return res.json({success:false, error: `try catch [user islogin] :  ${error.message}`})
        }
  };
  exports.getall = async(req, res) => {
        try {
          const response = await Users.findAll();
          console.log(' Users.findAll response >>',response);
          if (response) {
            res.json({success:true, result: response })
          } else {
            res.json({success:false, error: `Cannot find with user.` })
          }
        } catch (error) {
          return res.json({success:false, error: `try catch [user getall] :  ${error.message}`})
        }
  };
  exports.update = async(req, res) => {
        if (!req.body.id) {
          return res.json({success:false, error: `user can not be empty!` }) 
        }
        const id = req.body.id;
        try {
          const response = await Users.findOne({ where: { id: id }})
          console.log(' Users.update response >>',response);
          if (response) {
            if(req.body.Password!==response.Password){
              response.set({
                'FirstName':req.body.FirstName,
                'LastName':req.body.LastName,
                'Email':req.body.Email,
                'Password': await bcrypt.hash(req.body.Password, saltRounds),
                'Description':req.body.Description,
                'updateBy':req.body.updateBy,
              });
            }
            else{
              response.set({
                'FirstName':req.body.FirstName,
                'LastName':req.body.LastName,
                'Email':req.body.Email,
                'Description':req.body.Description,
                'updateBy':req.body.updateBy,
              });
            }
            await response.save();
            res.json({success:true, result: response });
          } else {
            res.json({success:false, error: `Cannot find with Email=${Email}` })
          }
        } catch (error) {
          return res.json({success:false,error: `try catch [user islogin] :  ${error.message}`})
        }
  };
  exports.create = async (req, res) => {
    if (!req.body.Email) {
      return res.send({success:false, error:"User Data can not be empty!"});
    }
    const userdata = { FirstName, LastName, Email, Password,Description,CreatedBy } = req.body;
          userdata.Password = encryptedPassword = await bcrypt.hash(Password, saltRounds);
    try {
      const response = await Users.create(userdata);
      console.log('Users.create response >>',response);
      if (response) {
        res.json({success:true, result: response })
      } else {
        res.json({success:false, error: `can not user created.` })
      }
    } catch (error) {
      return res.json({success:false,error: `try catch [user create] :  ${error.message}`})
    }
  };
  exports.delete = async(req, res) => {
    if (!req.body.id) {
      return res.send({message:"user can not be empty!"});
    }
    let id = req.body.id;
      try {
        const response = await Users.destroy({ where: { id: id }})
        console.log(' Users.destroy response >>',response);
        if (response) {
          res.json({success:true, result: 'deleted successfully.' });
        } else {
          res.json({success:false, error: `Cannot find with user.` })
        }
      } catch (error) {
        return res.json({success:false,error: `try catch [user delete] :  ${error.message}`})
      }
};
    
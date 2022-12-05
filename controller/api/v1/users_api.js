const User = require('../../../models/user');
const jwt = require('jsonwebtoken');

module.exports.createSession = async function(req,res){
    try{
        let user = await User.findOne({email:req.body.email});
        
        if(!user || user.password != req.body.password){
            return res.json(422,{
                message : 'invalid email/password'
            })
        }

        return res.json(200,{
            message : 'you have signed in successfully',
            data : {
                token : jwt.sign(user.toJSON(), 'codeial', {expiresIn : '100000'})
            }
        });

    }catch(err){
        console.log(err,' <<-- error in users_api in v1');
        res.json(500,{
            message : 'Internal server problem'
        });
    }
}
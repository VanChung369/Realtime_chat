const User = require("../model/Users");
const bcrypt = require("bcrypt");
const Users = require("../model/Users");
//signup
module.exports.signup = async(req, res, next) => {
  try {
    const { name, email, password, avatar } = req.body;
    const nameCheck = await User.findOne({ name });
    if (nameCheck)
      return res.json({ msg: "Username already used", status: false });
    const emailCheck = await User.findOne({ email });
    if (emailCheck)
      return res.json({ msg: "Email already used", status: false });
    const avatarcheck = await User.findOne({ avatar });  
    if (avatarcheck) return res.json({ msg: "avatar already used", status: false });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      name,
      avatar,
      password: hashedPassword,
    });
    delete user.password;
    return res.json({ status: true, user });
  } catch (e) {
    next(e);
  }
};
//login
module.exports.login= async(req,res,next)=>{
    try {
        const {email, password} = req.body;
        const user = await User.findOne({ email });
        if (!user)
          return res.json({ msg: "Email Khong Ton Tai", status: false });
        const passwordCheck = await bcrypt.compare(password,user.password);
        if(!passwordCheck)
        {
            return res.json({ msg: "Mat Khau Khong Chinh Xac", status: false });
        }
        delete user.password;
        return res.json({ status: true, user });
      } catch (e) {
        next(e);
      }
};
//get user
module.exports.alluser=async(req,res,next)=>{
try{
    const user = await User.find({_id:{$ne : req.params.id}}).select([
        "name","email","avatar","_id"
    ]);
   return res.json(user);
}
catch(e)
{
    next(e)
}
};
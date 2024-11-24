const User = require('../Schemas/user_model');
const bcrypt = require('bcrypt');

async function signup (req,res){

  console.log(req.body);
  const { username, email, password } = req.body;

  try {
   // Validate request
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Please provide all fields' });
    }
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}
      

async function signin(req,res){
  console.log(req.body);

  const { email, password } = req.body;

    try {
        // Validate request
        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide both email and password' });
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        // Compare hashed passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        res.status(200).json({ message: 'User signed in successfully', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = {
    signin,
    signup,
}
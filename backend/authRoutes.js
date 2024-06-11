// routes/auth.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('./models/user'); 

const JWT_SECRET = 'your_secret_key';

const validatePassword = (password) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  return regex.test(password);
};

router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  if (!validatePassword(password)) {
    return res.status(400).json({ message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.' });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'Email already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
});


//sign in 
// router.post('/signin', async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Find the user by email
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(400).json({ message: 'User not found' });
//     }

//     // Compare the provided password with the hashed password stored in the database
//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       return res.status(400).json({ message: 'Invalid password' });
//     }

//     // If the password is correct, generate a JWT token
//     const token = jwt.sign(
//       { userId: user._id },
//       JWT_SECRET,
//       { expiresIn: '1h' } // Token expires in 1 hour
//     );

//     // Send the token to the client
//     res.json({ token, message: 'Signed in successfully' });
//   } catch (error) {
//     console.error('Error signing in:', error);
//     res.status(500).json({ message: 'Server error', error });
//   }
// });

//signin with lock
// routes/auth.js
router.post('/api/auth/signin', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const now = new Date();
    if (user.failedAttempts >= 3 && user.lockTime && user.lockTime > now) {
      return res.status(429).json({ message: 'Account locked. Please wait for 5 minutes to retry.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      user.failedAttempts += 1;
      if (user.failedAttempts >= 3) {
        user.lockTime = new Date(now.getTime() + 5 * 60000); // Lock for 5 minutes
      }
      await user.save();
      return res.status(400).json({ message: 'Invalid password' });
    }

    // If the password is correct, generate a JWT token
    const token = jwt.sign(
      { userId: user._id },
      JWT_SECRET,
      { expiresIn: '1h' } // Token expires in 1 hour
    );

    // Send the token to the client
    res.json({ token, message: 'Signed in successfully' });
  } catch (error) {
    console.error('Error signing in:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});
module.exports = router;

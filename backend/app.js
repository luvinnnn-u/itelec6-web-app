const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Post = require('./models/post.js');
const User = require('./models/user.js'); // Make sure this path is correct

const JWT_SECRET = 'your_secret_key';

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

mongoose.connect("mongodb+srv://maryannedb:maryanne123@mydb.uqqr07j.mongodb.net/maryannedb?retryWrites=true&w=majority&appName=mydb")
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((err) => {
    console.log('Connection failed', err);
  });

  

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

app.post("/api/posts", upload.single('image'), (req, res) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    image: req.file ? req.file.path : null // Save the path of the uploaded image
  });
  post.save()
    .then(savedPost => {
      res.status(201).json({
        message: 'Post created successfully',
        post: savedPost
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        message: 'Error saving post'
      });
    });
});

// In your server.js or wherever you schedule your jobs
const cron = require('node-cron');

cron.schedule('*/5 * * * * *', async () => {
  const now = new Date();
  await User.updateMany(
    { lockTime: { $lt: now } },
    { $set: { failedAttempts: 0, lockTime: null } }
  );
});

app.get("/api/posts", async (req, res) => {
  const { page = 1, limit = 4 } = req.query;

  try {
    const posts = await Post.find()
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .exec();

    const count = await Post.countDocuments();

    res.status(200).json({
      message: 'Posts fetched successfully',
      posts,
      totalPages: Math.ceil(count / limit),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error fetching posts'
    });
  }
});

app.delete('/api/posts/:id', (req, res) => {
  Post.findByIdAndDelete(req.params.id)
    .then(result => {
      if (!result) {
        return res.status(404).json({ message: 'Post not found' });
      }
      res.status(200).json({ message: 'Post deleted successfully' });
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ message: 'Error deleting post' });
    });
});

app.put('/api/posts/:id', async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!post) {
      return res.status(404).send('The post with the given ID was not found.');
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error updating post' });
  }
});

// Sign-in route
// app.post('/api/auth/signin', async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         // Find the user by email
//         const user = await User.findOne({ email });

//         if (!user) {
//             return res.status(400).json({ message: 'User not found' });
//         }

//         // Compare the provided password with the hashed password
//         const isMatch = await bcrypt.compare(password, user.password);

//         if (!isMatch) {
//             return res.status(400).json({ message: 'Invalid password' });
//         }

//         // If the password is correct, generate a JWT token
//         const token = jwt.sign(
//             { userId: user._id },
//             JWT_SECRET,
//             { expiresIn: '1h' } // Token expires in 1 hour
//         );

//         // Send the token to the client
//         res.json({ token, message: 'Signed in successfully' });
//     } catch (error) {
//         console.error('Error signing in:', error);
//         res.status(500).json({ message: 'Server error', error });
//     }
// });

//sign in for lock
// app.post('/api/auth/signin', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(400).json({ message: 'User not found' });
//     }

//     const now = new Date();
//     if (user.failedAttempts >= 3 && user.lockTime && user.lockTime > now) {
//       return res.status(429).json({ message: 'Account locked. Please wait for 5 minutes to retry.' });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       user.failedAttempts += 1;
//       if (user.failedAttempts >= 3) {
//         user.lockTime = new Date(now.getTime() + 5 * 60000); // Lock for 5 minutes
//       }
//       await user.save();
//       return res.status(400).json({ message: 'Invalid password' });
//     }

//     // If the password is correct, reset failed attempts and clear lock time
//     user.failedAttempts = 0;
//     user.lockTime = null;
//     await user.save();

//     // Generate and send JWT token
//     const token = jwt.sign(
//       { userId: user._id },
//       JWT_SECRET,
//       { expiresIn: '1h' } // Token expires in 1 hour
//     );

//     res.json({ token, message: 'Signed in successfully' });
//   } catch (error) {
//     console.error('Error signing in:', error);
//     res.status(500).json({ message: 'Server error', error });
//   }
// });

//signin lock bago
app.post('/api/auth/signin', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const now = new Date();
    if (user.failedAttempts >= 3 && user.lockTime && user.lockTime > now) {
      // Provide immediate feedback after two incorrect attempts
      if (user.failedAttempts === 2) {
        return res.status(400).json({ message: 'Too many incorrect attempts. Please try again later.' });
      }
      // Clarify the account locking message
      return res.status(429).json({ message: 'Account locked for 5 minutes. Please try again later.' });
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

    // If the password is correct, reset failed attempts and clear lock time
    user.failedAttempts = 0;
    user.lockTime = null;
    await user.save();

    // Generate and send JWT token
    const token = jwt.sign(
      { userId: user._id },
      JWT_SECRET,
      { expiresIn: '1h' } // Token expires in 1 hour
    );

    res.json({ token, message: 'Signed in successfully' });
  } catch (error) {
    console.error('Error signing in:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});


// Sign-up route
app.post('/api/auth/signup', async (req, res) => {
  const { username, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'Email already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({ username, email, password: hashedPassword });

  try {
    await user.save();
    res.status(201).json({ message: 'Signup successful', user });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Error creating user', error });
  }
});

module.exports = app;

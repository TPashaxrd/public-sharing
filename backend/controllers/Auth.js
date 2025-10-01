const bcrypt = require("bcryptjs")
const dotenv = require("dotenv")
const User = require("../models/User")

dotenv.config()

const CreateUser = async (req, res) => {
    try {
        const { username, email, password, IP_Address } = req.body;
        if(!username || !email || !password || !IP_Address) {
            return res.status(400).json({ message: "All fields are required."})
        }
        const existingMail = await User.findOne({ email })
        const existingUsername = await User.findOne({ username })
        if(existingMail) {
            return res.status(400).json({ message: "This email already using."})
        }
        if(existingUsername) {
            return res.status(400).json({ message: "This username already using."})
        }

        const hashed = await bcrypt.hash(password, 10)

        const user = await User.create({
            username,
            email,
            password: hashed,
            IP_Address
        })

        req.session.userId = user._id;

        res.status(201).json({ message: "Registered successfully", user: { id: user._id, username, email }})
    } catch (error) {
        res.status(500).json({ mesage: error.message })
    }
}

const Login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username })
        if(!user) return res.status(400).json({ message: "User not found."})
        
        const match = await bcrypt.compare(password, user.password);
        if(!match) return res.status(400).json({ message: "Incorrect Password."})
        
        req.session.userId = user._id;
        
        res.status(201).json({ message: "Logged in", user: { id: user._id, username: user.username, email: user.email } });        
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const Logout = async (req, res) => {
    req.session.destroy(err => {
        if(err) return res.status(500).json({ message: "Logout error" })
        res.clearCookie("connect.sid")
        res.status(201).json({ message: "Logged out" })
    })
}

const me = async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Not logged in" })
    }

    const user = await User.findById(req.session.userId).select("-password")

    if (!user) {
      req.session.destroy((err) => {
        if (err) console.error("Session destroy error:", err)
      })

      res.clearCookie("connect.sid")
      return res.status(404).json({ message: "User not found, please login again." })
    }

    res.status(200).json({ user }) 
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}




module.exports = { CreateUser, Login, Logout, me }
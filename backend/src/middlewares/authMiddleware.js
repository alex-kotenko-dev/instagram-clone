import jwt from 'jsonwebtoken'

const protect = (req, res, next) => {
  let token

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1]

      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.user = { _id: decoded.userId } 

      return next()

    } catch (error) {
      console.error(error)
      return res.status(401).json({message: 'Not authorized'})
    }
  }
  
  return res.status(401).json({message: 'Not authorized, no token'})
}

export default protect



// import jwt from 'jsonwebtoken'

// const protect = (req, res, next) => {
//   let token

//   if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
//     try {
//       token = req.headers.authorization.split(' ')[1]
//       const decoded = jwt.verify(token, process.env.JWT_SECRET)

//       // unify: всегда _id для фронта и сокета
//       req.user = { _id: decoded.userId }

//       return next()
//     } catch (error) {
//       console.error('Protect middleware error:', error)
//       return res.status(401).json({ message: 'Not authorized' })
//     }
//   } else {
//     return res.status(401).json({ message: 'Not authorized, no token' })
//   }
// }

// export default protect
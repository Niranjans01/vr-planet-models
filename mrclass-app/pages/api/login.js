import { findUser, validatePassword } from "@/components/utils/user"

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body
    findUser({ username })
      .then((user) => {
        validatePassword(user, password)
          .then((passwordsMatch) => {
            if (passwordsMatch) {
              res.status(200).json({ user, message:'Successfully Authed', success: true })
            } else {
              res.status(401).json({ message: 'Invalid password', success: false })
            }
          }
          ).catch((error) => {
            res.status(500).json({ error })
          }
          )
      }
      ).catch((error) => {
        res.status(500).json({ error })
      }
      )
  }
}
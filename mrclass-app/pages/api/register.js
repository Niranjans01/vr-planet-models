import { createUser } from "@/components/utils/user"

export default function handler(req, res) {
    if (req.method === 'POST') {
        const { username, password, email, profileModel, profileModelName } = req.body
        createUser({ username, password, email, profileModel, profileModelName })
            .then((user) => {
                res.status(200).json({ user, message: 'Successfully Register', success: true })
            }
            ).catch((error) => {
                res.status(500).json({ message: 'Invalid Attempt', error, success: false })
            }
            )
    }
}
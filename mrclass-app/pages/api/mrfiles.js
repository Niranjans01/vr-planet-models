import { verifyHash } from "@/components/utils/user";
import fs from "fs";
const filePath = "./public/mrpages/";
import { v4 as uuidv4 } from 'uuid';

export default async function api(req, res) {
    const { query: { filename, id } } = req;
    let userAccount = JSON.parse(req.cookies.userAuth||"{}")

    verifyHash({ hash: userAccount.hash }).then(async (user) => {
        if (user?.uid) {
            res.setHeader("Content-Type", "text/html; charset=utf-8");
            res.write(await fs.readFileSync(filePath + filename, "utf-8"));
            res.end();
        }
        else {
            res.status(404).send("Not found");
        }
    })

}
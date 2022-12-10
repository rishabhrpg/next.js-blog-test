import { NextApiRequest, NextApiResponse } from "next";
import { RestAPI } from "../../helpers/rest-api";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const {
        query: { id, name },
        method,
    } = req

    const api = new RestAPI(req, res);

    api.onGet = () => {
        console.log('Hello beautiful get');
        res.status(200).json({ method: req.method });
    }

    api.onPost = () => {
        console.log('hello POST')
        res.status(200).json({ method: req.method });
    }

    api.onDefault();
}
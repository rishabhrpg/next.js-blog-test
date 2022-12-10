import { NextApiRequest, NextApiResponse } from "next";

export class RestAPI {

    private availableMethods: string[] = [];

    constructor(private req: NextApiRequest, private res: NextApiResponse) { }

    public set onGet(callback) {
        if (this.req.method === 'GET') {
            this.availableMethods.push(this.req.method);
            callback();
        }
    }

    public set onPost(callback) {
        if (this.req.method === 'POST') {
            this.availableMethods.push(this.req.method);
            callback();
        }
    }

    public set onDefault(callback) {
        if (!this.availableMethods.includes(this.req.method)) {
           callback();
        }
    }

    public get onDefault() {
        if (!this.availableMethods.includes(this.req.method)) {
            this.res.setHeader('Allow', this.availableMethods);
            this.res.status(405).end(`Method ${this.req.method} Not Allowed`);
        }
        return () => {};
    }

    public get onGet() {
        return this.unreadableError({ method: 'onGet' });
    }

    public get onPost() {
        return this.unreadableError({ method: 'onPost' });
    }

    unreadableError({ method }: { method: string }) {
        throw new Error(`${method} is not callable, please assign a new function instead`);
        return () => { };
    }
}



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


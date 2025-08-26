//reference: https://authjs.dev/getting-started/adapters/mongodb?_gl=1*1nv6o89*_gcl_au*Nzc5NDQ2OTM4LjE3NTQ5Mzk5MjkuNjk1NjE2ODU5LjE3NTYxNDg2NzguMTc1NjE0ODc3NA..
// This approach is taken from https://github.com/vercel/next.js/tree/canary/examples/with-mongodb
import { MongoClient } from "mongodb"

if (!process.env.MONGO_URL) {
    throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}

const uri = process.env.MONGO_URL
const options = {}

let client
let clientPromise;

if (process.env.NODE_ENV === "development") {
    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR (Hot Module Replacement).
    if (!global._mongoClientPromise) {
        client = new MongoClient(uri, options)
        global._mongoClientPromise = client.connect()
    }
    clientPromise = global._mongoClientPromise
} else {
    // In production mode, it's best to not use a global variable.
    client = new MongoClient(uri, options)
    clientPromise = client.connect()
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;
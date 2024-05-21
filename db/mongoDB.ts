import { MongoClient, ServerApiVersion } from 'mongodb'
const uri = 'mongodb+srv://vidios74:FLkMqRYIrYCbNSxz@cluster0.fpp5k4i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

export async function runDB (): Promise<MongoClient> {
  try {
    await client.connect()
    // console.log('You successfully connected to MongoDB!')
    return client
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
    throw error // Re-throw to handle in the calling code
  }
}

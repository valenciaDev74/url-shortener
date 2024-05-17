import { runDB } from '../db/mongoDB'
import { IUrlModel } from '../types'

export default class UrlModel implements IUrlModel {
  async save (originalUrl: string, shortUrl: string): Promise<void> {
    const client = await runDB()
    const db = client.db('url_shortener')
    const collection = db.collection('urls')

    try {
      const insertedDocument = await collection.insertOne({ originalUrl, shortUrl })

      if (insertedDocument) {
        await client.close()
      }
    } catch (err) {
      console.error('Error al guardar la URL:', err)
    }
  }

  async getOriginal (shortUrl: string): Promise<string|null> {
    const client = await runDB()
    const db = client.db('url_shortener')
    const collection = db.collection('urls')

    try {
      const original = await collection.findOne({ shortUrl })
      return original ? original.originalUrl : null
    } catch (err) {
      console.error('Error al obtener la URL original:', err)
      return null
    } finally {
      await client.close()
    }
  }
}

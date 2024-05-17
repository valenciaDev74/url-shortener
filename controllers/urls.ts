// import urlsModel from '../models/urls'
import { Request, Response } from 'express'
import { IUrlModel } from '../types'

export default class UrlController {
  private urlModel: IUrlModel
  constructor (urlModel: IUrlModel) {
    this.urlModel = urlModel
  }

  shortenUrl = async (req: Request, res: Response): Promise<void> => {
    const originalUrl: string = req.body.longUrl
    const shortUrl = this.randomCode()

    await this.urlModel.save(originalUrl, shortUrl)

    res.json({ originalUrl, shortUrl })
  }

  redirectUrl = async (req: Request, res: Response): Promise<void> => {
    const { shortUrl } = req.params
    if (shortUrl === undefined) return

    const originalUrl = await this.urlModel.getOriginal(shortUrl)

    if (originalUrl) {
      res.redirect(301, originalUrl)
    } else {
      res.status(404).send('URL not found')
    }
  }

  private randomCode = (): string => {
    const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let randomString = ''
    for (let i = 0; i < 8; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length)
      randomString += characters[randomIndex]
    }
    return randomString
  }
}

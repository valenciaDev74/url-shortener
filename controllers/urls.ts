// import urlsModel from '../models/urls'
import { Request, Response } from 'express'
import { IUrlModel } from '../types'

export default class UrlController {
  private urlModel: IUrlModel
  constructor (urlModel: IUrlModel) {
    this.urlModel = urlModel
  }

  shortenUrl = async (req: Request, res: Response): Promise<void> => {
    const { longUrl, personalRouteValue } = req.body

    let shortUrl: string

    if (!personalRouteValue) {
      shortUrl = this.randomCode()
    } else {
      shortUrl = personalRouteValue
    }

    // si el enlace ya existe
    const exist = await this.urlModel.exist({ shortUrl })
    if (exist) {
      res.status(409).json({ message: 'Short URL already exists.' })
    } else {
      await this.urlModel.save(longUrl, shortUrl)
      res.json({ longUrl, shortUrl })
    }
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

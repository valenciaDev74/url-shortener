import { Request, Response, Router } from 'express'
import { IUrlModel } from '../types'
import UrlController from '../controllers/urls'

export function createUrlsRoutes (urlModel: IUrlModel) {
  const urlController = new UrlController(urlModel)
  const router = Router()

  router.get('/', async (req: Request, res: Response): Promise<void> => {
    const shortenedUrls = null

    const renderVariables = {
      shortenedUrls

    }
    res.render('../views/index', renderVariables)
  })
  router.post('/shorten', urlController.shortenUrl)
  router.get('/:shortUrl', urlController.redirectUrl)

  return router
}

import { Request, Response, Router } from 'express'

export function createUiRoutes () {
  const router = Router()

  router.get('/', async (req: Request, res: Response): Promise<void> => {
    const shortenedUrls = null

    const renderVariables = {
      shortenedUrls

    }
    res.render('../views/index', renderVariables)
  })

  return router
}

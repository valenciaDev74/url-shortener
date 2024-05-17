import express from 'express'
import UrlModel from './models/urls'
import { createUrlsRoutes } from './routes/urls'
import { createUiRoutes } from './routes/ui'

const urlModel = new UrlModel()
const app = express()
const Uirouter = createUiRoutes()
const Urlsrouter = createUrlsRoutes(urlModel)

app.use(express.json())
app.set('view engine', 'ejs')
app.use(Uirouter)
app.use(Urlsrouter)

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server listening on port ${port}`))

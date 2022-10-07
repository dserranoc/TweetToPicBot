import express from 'express'
import path from 'path'

import { TwingEnvironment, TwingLoaderFilesystem } from 'twing'

const loader = new TwingLoaderFilesystem(__dirname + '/template')
const twing = new TwingEnvironment(loader)


const app = express()
app.use(express.json())
app.use('/css', express.static(path.join(__dirname, './template/css')))
app.use('/js', express.static(path.join(__dirname, './template/js')))

app.get('/tweet/:text', (req, res) => {
  const { params } = req
  return twing.render('index.twig', { tweet: params.text }).then((output) => {
    res.status(200).send(output)
  })
})

export default app

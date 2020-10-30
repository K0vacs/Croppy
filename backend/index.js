import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import fs from 'fs'

const app = express()
const port = 3001

app.use(cors())
app.use(bodyParser.json({
  type: 'application/json',
  parameterLimit: 100000,
  limit: '5mb',
}))

app.get('/', (req, res) => {
  res.send('The Node App is running')
})

app.post('/upload', (req, res) => {
  const data = req.body
  const name = `${ Date.now() }_${ data.name }`
  const base64 = data.croppedImg.base64.replace(/^data:image\/[a-z]+;base64,/, "")

  fs.writeFile(`./images/${ name }`,  base64, 'base64', function(err) {
    if(err) {
        return console.log(err);
    }
  });

  res.send({
    saved: {
      name: name,
      x: data.crop.x,
      y: data.crop.y,
      width: data.crop.width,
      height: data.crop.height,
      unit: data.crop.unit
    }
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
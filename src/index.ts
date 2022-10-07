import app from './app'
import bot from './bot'


const PORT = process.env.PORT || 3000

app.listen(PORT, async ()=> {
  console.log(`Web server listening on http://localhost:${PORT}`)
  await bot.start()
  console.log('Bot started!')
})
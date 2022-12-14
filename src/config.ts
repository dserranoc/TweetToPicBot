export const config = {
  keys: {
    appKey: process.env.APP_KEY,
    appSecret: process.env.APP_SECRET,
    accessToken: process.env.ACCESS_TOKEN,
    accessSecret: process.env.ACCESS_SECRET,
    bearerToken: process.env.BEARER_TOKEN
  },
  options: {
    username: 'TweetToPicBot',
    command: 'print'
  }
}

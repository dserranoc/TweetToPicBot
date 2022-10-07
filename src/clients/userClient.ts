import { TwitterApi } from 'twitter-api-v2'
import { config } from '../config'

const twitterClientUser = new TwitterApi({
  appKey: config.keys.appKey,
  appSecret: config.keys.appSecret,
  accessToken: config.keys.accessToken,
  accessSecret: config.keys.accessSecret
})


const client = twitterClientUser.readWrite

export default client
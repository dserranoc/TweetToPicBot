import { TwitterApi } from 'twitter-api-v2'
import {config} from '../config'

const twitterClientApp = new TwitterApi(config.keys.bearerToken!)
const client = twitterClientApp.readWrite

export default client
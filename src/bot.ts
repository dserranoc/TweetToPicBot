import { ETwitterStreamEvent } from 'twitter-api-v2'
import 'dotenv/config'

import appClient from './clients/appClient'
import userClient from './clients/userClient'

import converter from './converter'

import {config} from './config'

const parseTweet = (tweet) => {
  return tweet.replaceAll(`@${config.options.username}`, '').replaceAll(/\s+/g, '')
}


const uploadMedia = async (buffer, mimeType) => {
  const mediaIds = await Promise.all([
    userClient.v1.uploadMedia(Buffer.from(buffer!), { mimeType: mimeType }),
  ])
  return mediaIds
}

const bot = {
  deleteRules: async () => {
    const rules = await appClient.v2.streamRules()
    if (rules.data?.length) {
      await appClient.v2.updateStreamRules({
        delete: { ids: rules.data.map(rule => rule.id) },
      })
    }
  },
  addRules: async () => {
    await appClient.v2.updateStreamRules({
      add: [{ value: `-(from:${config.options.username}) (@${config.options.username})` }],
    })
  },
  start: async () => {

    const stream = await appClient.v2.searchStream({
      'tweet.fields': ['referenced_tweets', 'author_id'],
      // expansions: ['referenced_tweets.id'],
    })

    stream.autoReconnect = true

    stream.on(ETwitterStreamEvent.Data, async tweet => {
      const { data } = tweet
      const parsedTweet = parseTweet(data.text)

      if (!data.referenced_tweets) {
        return await userClient.v2.reply(`Hi! Mention me and write "${config.options.command}" in a reply to a tweet to turn it into an image.`, data.id)
      }

      if (parsedTweet !== config.options.command) {
        return await userClient.v2.reply(`Sorry! I can't understand you. If you want to turn a tweet into an image please mention me and write "${config.options.command}" in a reply to that tweet.`, data.id)
      }

      if (data.referenced_tweets && data.referenced_tweets[0].type == 'replied_to') {
        const { id: idToReply } = data.referenced_tweets[0]
        const tweetText = await appClient.v2.singleTweet(idToReply)

        const buffer = await converter.toPNG(tweetText.data.text)
        const mediaIds = await uploadMedia(buffer, 'image/png')

        return await userClient.v2.reply('Here you go!', data.id, { media: { media_ids: mediaIds } })
      }

      return null
    })
  }
}






export default bot
import { Message } from '../../../common/types/Message.type'
import { adjectives, animals, colors, Config, names, uniqueNamesGenerator } from 'unique-names-generator'
import Bot from './Bot'

export default class SpamBot extends Bot {
  ids: number[] = []

  constructor(id: number) {
    super(
      id,
      'Spam bot',
      'https://media.istockphoto.com/photos/spam-picture-id458632943',
      'lorem ipsem'
    )
  }

  getRandNum() {
    return (10 + Math.random() * 110) * 1000
  }

  getSpamText() {
    return uniqueNamesGenerator({
      dictionaries: [adjectives, colors, adjectives, names, animals],
      separator: ' ',
      length: 5
    })
  }

  onMessage(msg: Message, send: (m: Message) => void) {
    const d = this.ids.find(id => id === msg.senderId)
    if (!d) {
      this.ids.push(msg.senderId)

      const spam = () => {
        const botMsg: Message = {
          ...msg,
          senderName: msg.recipientName,
          senderId: msg.recipientId,
          recipientName: msg.senderName,
          recipientId: msg.senderId,
          text: 'SPAM: ' + this.getSpamText()
        }
        send(botMsg)

        setTimeout(spam, this.getRandNum())
      }
      spam()
    }
  }
}

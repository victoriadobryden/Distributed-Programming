import { Message } from '../../../common/types/Message.type'
import Bot from './Bot'

export default class ReverseBot extends Bot {
  constructor(id: number) {
    super(
      id,
      'Reverse bot',
      'https://ih1.redbubble.net/image.979634724.6720/st,small,507x507-pad,600x600,f8f8f8.jpg',
      'lorem ipsem',
    )
  }

  onMessage(msg: Message,  send: (m: Message) => void) {
    const botMsg: Message = {
      ...msg,
      senderName: msg.recipientName,
      senderId: msg.recipientId,
      recipientName: msg.senderName,
      recipientId: msg.senderId,
      text: msg.text.split('').reverse().join('')
    }

    setTimeout(() => send(botMsg), 3000)
  }
}

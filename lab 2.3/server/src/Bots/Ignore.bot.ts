import { Message } from '../../../common/types/Message.type'
import Bot from './Bot'

export default class IgnoreBot extends Bot {
  constructor(id: number) {
    super(
      id,
      'Ignore bot',
      'https://media.wired.co.uk/photos/606d9a9ea876dd2203a63aaa/master/w_1600%2Cc_limit/wired-work-notifications-1.jpg',
      'lorem ipsem',
    )
  }

  onMessage(_msg: Message,  _send: (m: Message) => void) {
  }
}

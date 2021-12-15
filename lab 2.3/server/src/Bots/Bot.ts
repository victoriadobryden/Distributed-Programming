import { User } from '../../../common/types/User.type'
import { Message } from '../../../common/types/Message.type'

export default abstract class Bot implements User {
  protected constructor(
    public id: number,
    public name: string,
    public imgURL: string,
    public info: string,
    public online = true,
    public bot = true
  ) {}

  abstract onMessage(msg: Message, send: (m: Message) => void): void
}

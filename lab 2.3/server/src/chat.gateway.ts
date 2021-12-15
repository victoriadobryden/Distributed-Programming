import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets'
import { adjectives, Config, names, uniqueNamesGenerator } from 'unique-names-generator'
import { User } from '../../common/types/User.type'
import { Chat } from '../../common/types/Chat.type'
import { Message } from '../../common/types/Message.type'
import EchoBot from './Bots/Echo.bot'
import Bot from './Bots/Bot'
import IgnoreBot from './Bots/Ignore.bot'
import ReverseBot from './Bots/Reverse.bot'
import SpamBot from './Bots/Spam.bot'

@WebSocketGateway(8080, { cors: true })
export class ChatGateway {
  @WebSocketServer()
  server!: any

  users: User[] = [
    new EchoBot(0),
    new IgnoreBot(1),
    new ReverseBot(2),
    new SpamBot(3),
  ]

  chats: Chat[] = []

  @SubscribeMessage('CREATE_USER')
  handleCreateUser() {
    const user = this.getRandomUser()
    this.users.push(user)
    this.server.emit('UPDATE_USERS', this.users)
    this.server.emit('UPDATE_CHATS_FOR' + user.id, this.getChatsById(user.id))
    return user
  }

  @SubscribeMessage('SEND_MESSAGE')
  handleSendMessage(@MessageBody() msg: Message) {
    this.sendMessage(msg)

    const u = this.users.find(u => u.id === msg.recipientId)
    if(u?.bot) (u as Bot).onMessage(msg, this.sendMessage)
  }

  @SubscribeMessage('TYPING')
  handleTyping(@MessageBody() {who, to}: {who: number, to: number}) {
    const user = this.users.find(u => u.id === who)
    if (user) user.typingId = to

    this.server.emit('UPDATE_USERS', this.users)
  }

  @SubscribeMessage('ENTER')
  handleEnter(@MessageBody('id') id: number) {
    const user = this.users.find(u => u.id === id)
    if (user) user.online = true

    this.server.emit('UPDATE_USERS', this.users)
    this.server.emit('UPDATE_CHATS_FOR' + user?.id, this.getChatsById(user?.id ?? 0))
  }

  @SubscribeMessage('EXIT')
  handleExit(@MessageBody('id') id: number) {
    const user = this.users.find(u => u.id === id)
    if (user) user.online = false

    this.server.emit('UPDATE_USERS', this.users)
  }

  sendMessage = (msg: Message) => {
    const { senderId, recipientId } = msg
    let chat = this.chats.find(c => (
      (c.firstId === senderId && c.secondId === recipientId) ||
      (c.firstId === recipientId && c.secondId === senderId)
    ))

    if (!chat) {
      chat = {
        firstId: senderId,
        secondId: recipientId,
        messages: []
      }
      this.chats.push(chat)
    }
    chat.messages.push(msg)
    const sendersChats = this.getChatsById(senderId)
    const recipientsChats = this.getChatsById(recipientId)
    this.server.emit('UPDATE_CHATS_FOR' + senderId, sendersChats)
    this.server.emit('UPDATE_CHATS_FOR' + recipientId, recipientsChats)
  }

  getChatsById(id: number) {
    return  this.chats.filter(c => (
      c.firstId === id ||
      c.secondId === id
    ))
  }

  getRandomUser(): User {
    const customConfig: Config = {
      dictionaries: [adjectives, names],
      separator: ' ',
      length: 2
    }

    const userCount = this.users.length
    return {
      id: userCount,
      name: uniqueNamesGenerator(customConfig),
      imgURL: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80',
      online: true,
      info: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. A animi deserunt ea esse magnam quidem sunt? Ad aperiam, blanditiis debitis, ducimus esse fuga iure maxime molestiae praesentium recusandae, repudiandae vel?',
      typingId: -1,
      bot: false
    }
  }
}

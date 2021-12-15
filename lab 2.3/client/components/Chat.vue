<template>
  <div class='chat'>
    <UserInfo :user='user'/>

    <div class='messages'>
      <p v-show='user.typingId === me.id' class='typing'>
        {{user.name}} is typing...
      </p>
      <Message
        v-for='msg in messagesReverse'
        :key='msg.text'
        :msg='msg'
        :me='me'
      />
    </div>

    <div class='controls'>
      <input
        v-model='messageText'
        type='text'
        placeholder='Start chatting!'
        @focus='textChanged'
        @keydown.enter='sendMsg'
      />
      <button @click='sendMsg'>Send message</button>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { NuxtSocket } from 'nuxt-socket-io'
import { Message } from '~/common/types/Message.type'
import { User } from '~/common/types/User.type'

@Component({name: 'Chat'})
export default class extends Vue {
  @Prop() me!: User
  @Prop() user!: User
  @Prop() messages!: Message[]

  socket!: NuxtSocket
  messageText: string = ''

  get messagesReverse() {
    const arr = [...this.messages]
    return arr.reverse()
  }

  mounted() {
    this.socket = this.$nuxtSocket({
      reconnection: false
    })
  }

  textChanged() {
    console.log('kek')
    const text = this.messageText.trim()
    if(text) {
      this.socket.emit('TYPING', {who: this.me.id, to: this.user.id})
    } else {
      this.socket.emit('TYPING', {who: this.me.id, to: -1})
    }
  }

  sendMsg() {
    const text = this.messageText.trim()
    if (text) {
      const msg: Message = {
        senderId: this.me.id,
        senderName: this.me.name,
        recipientId: this.user.id,
        recipientName: this.user.name,
        text: this.messageText,
        time: this.time
      }
      this.socket.emit('SEND_MESSAGE', msg)
      this.messageText = ''
    }
  }

  get time() {
    const date = new Date()
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const end = hours > 12 ? ' PM' : ' AM'
    return hours % 24 + ':' + minutes + end
  }
}
</script>

<style scoped>
.chat {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  width: 100%;
  min-height: 500px;
  flex-grow: 1;

  background-color: #D7DFE7;
  box-sizing: border-box;
}

.messages {
  display: flex;
  flex-direction: column-reverse;
  overflow-y: auto;
  overflow-x: hidden;
}

.typing {
  align-self: center;
  margin-bottom: .5rem;

  color: #428BCA;
}

.controls {
  display: flex;
  justify-content: space-around;
  width: 100%;

  background: #D7DFE7;
}
</style>

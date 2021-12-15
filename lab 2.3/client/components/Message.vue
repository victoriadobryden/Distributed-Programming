<template>
  <div class='message' :class='{"message_my": isMy}'>
    <div class='head'>
      <span class='username'>{{ msg.senderName }}</span>
      <span class='time'>{{ msg.time }}</span>
    </div>

    <div class='body'>
      <p class='text'>{{ msg.text }}</p>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { Message } from '~/common/types/Message.type'
import { User } from '~/common/types/User.type'

@Component({name: 'Message'})
export default class extends Vue {
  @Prop() msg!: Message
  @Prop() me!: User

  get isMy() {
    return this.msg.senderId === this.me.id
  }
}
</script>

<style scoped>
.message {
  position: relative;
  width: 45rem;
  max-width: calc(100% - 3rem);
  margin: 1.5rem;

  background-color: white;
  border-radius: .5rem;
  filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.3));
}

.message_my {
  align-self: end;
}

.message:not(.message_my)::before {
  content: '';
  width: 0;
  height: 0;
  position: absolute;
  left: -.75rem;
  top: 4rem;
  border-style: solid;
  border-width: .75rem .75rem .75rem 0;
  border-color: transparent white transparent transparent;
  display: inline-block;
  vertical-align: middle;
}
.message_my::before {
  content: '';
  width: 0;
  height: 0;
  position: absolute;
  right: -.75rem;
  top: 4rem;
  border-style: solid;
  border-width: .75rem 0 .75rem .75rem;
  border-color: transparent transparent transparent white;
  display: inline-block;
  vertical-align: middle;
}

.head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;

  background-color: #BECBD9;
  border-top-left-radius: .5rem;
  border-top-right-radius: .5rem;
}
.message_my .head {
  background-color: #F0CBB3;
}

.time {
  color: grey;
  margin-left: 1rem;
}

.body {
  padding: 1rem;
}
</style>

<template>
  <div class="chat-li">
    <img class="photo" :src="data.user.imgURL" />
    <div v-show="data.user.online" class="online" />

    <div class="text-div">
      <h6 class="name">{{ data.user.name }}</h6>
      <p class="last-msg">{{ data.lastMsg }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import { User } from '~/common/types/User.type';

@Component({name: 'ListItem'})
export default class extends Vue {
  @Prop() data!: {user: User, lastMsg: string}
}
</script>

<style scoped>
  .chat-li {
    display: flex;
    width: calc(100% - 2rem);
    position: relative;
    padding: .5rem 1rem;

    background-color: white;
  }
  .chat-li:hover {
     background-color: #F8F8F8;
  }
  .chat-li:active {
    background-color: #E8E8E8;
  }

  .photo {
    width: 5rem;
    height: 5rem;

    border-radius: .25rem;
  }

  .online {
    width: 1rem;
    height: 1rem;
    position: absolute;
    top: 4.7rem;
    left: 5.2rem;

    border-radius: .5rem;
    background-color: rgb(0, 255, 0);
  }

  .text-div {
    padding-top: .5rem;
    margin: 0 1.5rem;
  }
  .name,
  .last-msg {
    line-height: 100%;
  }
  .name {
    font-size: 1.5rem;
  }
  .last-msg {
    height: 2rem;
    color: grey;
    font-size: 1.25rem;
  }


</style>

<template>
  <div class='user-info'>
    <img class='user-info__photo' :src='user.imgURL' />
    <div class='user-info__text'>
      <h6 class='user-info__name'>{{ user.name }}</h6>
      <p class='user-info__info'>{{ user.info }}</p>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import { User } from '../../common/types/User.type';

@Component({name: 'UserInfo'})
export default class extends Vue {
  @Prop() user!: User
}
</script>

<style scoped>
  .user-info {
    display: flex;
    width: 100%;

    background-color: #BECBD9;
  }

  .user-info__photo {
    width: 12rem;
    height: 12rem;
  }

  .user-info__text {
    padding: 2rem;;
    line-height: 150%;
  }
  .user-info__name {
    font-size: 1.5rem;
    margin-bottom: .3rem;
  }
</style>

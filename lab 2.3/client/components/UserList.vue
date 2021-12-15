<template>
  <div class='user-list'>
    <div class='user-list__btns'>
      <div class='list-btn'
           :class='{"list-btn_active": isOnlineSearch}'
           @click='isOnlineSearch = true'>
        <span class='label'>Online</span>
      </div>
      <div class='list-btn'
           :class='{"list-btn_active": !isOnlineSearch}'
           @click='isOnlineSearch = false'>
        <span class='label'>All</span>
      </div>
    </div>

    <div class='users'>
      <UserItem
        v-for='data in dataList'
        :key='data.user.name'
        :data='data'
        @click.native='onChoose(data.user.id)'
      />
    </div>

    <input
      v-model='search'
      placeholder='Search...'
      class='input'
      type='text'
    />
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { User } from '~/common/types/User.type'

@Component({name: 'UserList'})
export default class extends Vue {
  @Prop() usersData!: {user: User, lastMsg: string }[]
  @Prop() onChoose!: (id: number) => void
  isOnlineSearch = false
  search = ''

  get dataList() {
    const normalizedSearch = this.search.toLowerCase()
    const searchedUsersData = this.usersData.filter(d => {
      const normalizedName =  d.user.name.toLowerCase()
      return normalizedName.includes(normalizedSearch)
    })

    if (this.isOnlineSearch) {
      return searchedUsersData.filter(d => d.user.online)
    }
    return searchedUsersData
  }
}
</script>

<style scoped>
.user-list {
  display: flex;
  flex-direction: column;
  justify-content: stretch;

  background-color: white;
  box-sizing: border-box;
}

.user-list__btns {
  display: flex;
  justify-content: stretch;
}

.list-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 4rem;

  box-sizing: border-box;
  background-color: #F8F8F8;
  border: #c6c6c6 1px solid;
  border-top: none;
}
.list-btn:not(.list-btn_active):hover {
  background-color: #e8e8e8;
}
.list-btn_active {
  color: black;

  background-color: white;
  border: none;
}

.users {
  flex-grow: 1;
  overflow-y: auto;
}
</style>

<template lang="pug">
.fv-avatar-with-name
  fv-flex-items
    template(v-slot:left)
      fv-avatar(
        data-testid="avatar"
        :avatar="computedAvatar"
      )
    template(v-slot:right)
      div.right
        div.name(data-testid="name") {{ name }} {{ familyName }}
        div(data-testid="email") {{ email }}
</template>

<script>
export default {
  name: 'FvAvatarWithName',
  props: {
    name: {
      type: String,
      default() {
        return null
      },
    },
    familyName: {
      type: String,
      default() {
        return null
      },
    },
    email: {
      type: String,
      default() {
        return null
      },
    },
    avatar: {
      type: String,
      default() {
        return null
      },
    },
  },
  computed: {
    computedAvatar() {
      if (this.avatar) return this.avatar
      let url = 'https://eu.ui-avatars.com/api/?'
      url += 'name=' + this.name
      if (this.familyName) {
        url += '+' + this.familyName
      } else {
        url += '&length=1'
      }
      return url
    },
  },
}
</script>

<style scoped>
.name {
  font-weight: bold;
}
.right {
  margin-left: 15px;
}
</style>

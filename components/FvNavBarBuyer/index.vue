<template lang="pug">
.fv-nav-bar-buyer
  fv-nav-bar(
    data-testid="navBar"
    :title='title'
    :space="space"
  )
    template(slot='left')
      fv-search-autocomplete(data-testid="search")
    template(slot='right')
      div(class='icons')
        v-list-item(
          data-testid="icons"
          v-for="(item, a) in icons"
          :key="a"
          :to="item.to"
        )
          v-icon(size='25') {{ item.icon }}
</template>

<script>
export default {
  name: 'FvNavBarBuyer',
  props: {
    title: {
      type: String,
      default() {
        return 'Flex Up - Sprint 0'
      },
    },
  },
  data() {
    return {
      icons: [
        {
          icon: 'mdi-map-marker-outline',
          to: '/adresses',
        },
        {
          icon: 'mdi-heart-outline',
          to: '/favorite',
        },
        {
          icon: 'mdi-basket-outline',
          to: '/shop',
        },
      ],
      space: 'buyer',
    }
  },
}
</script>

<style scoped>
.icons {
  display: flex;
  justify-content: flex-end;
  flex: initial;
}
</style>

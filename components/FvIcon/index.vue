<template lang="pug">
.fv-icon
  v-icon(
    data-testid="icon"
    :color="color"
    :x-small="xSmall"
    :small="small"
    :large="large"
    :x-large="xLarge"
    @click="clicked"
  )
    | {{ icon }}
</template>

<script>
export default {
  name: 'FvIcon',
  props: {
    icon: {
      type: String,
      default() {
        return null
      },
    },
    color: {
      type: String,
      default() {
        return '#000000'
      },
    },
    size: {
      type: String,
      default() {
        return null
      },
    },
  },
  data() {
    return {
      xSmall: false,
      small: false,
      large: false,
      xLarge: false,
    }
  },
  watch: {
    size() {
      this.setSize()
    },
  },
  mounted() {
    this.setSize()
  },
  methods: {
    clicked() {
      this.$emit('icon:clicked')
    },
    setSize() {
      switch (this.size) {
        case 'xSmall':
          this.xLarge = false
          this.xSmall = true
          this.large = false
          this.small = false
          break
        case 'small':
          this.xLarge = false
          this.xSmall = false
          this.large = false
          this.small = true
          break
        case 'large':
          this.xLarge = false
          this.xSmall = false
          this.large = true
          this.small = false
          break
        case 'xLarge':
          this.xLarge = true
          this.xSmall = false
          this.large = false
          this.small = false
          break
        default:
          this.xLarge = false
          this.xSmall = false
          this.large = false
          this.small = false
      }
    },
  },
}
</script>

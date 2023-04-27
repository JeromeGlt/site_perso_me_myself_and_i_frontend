<template>
  <div id="show_error" v-if="error">
    <p>{{ error }}</p>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'showErrors',
    computed: {
      ...mapState({
        error: state => state.error
      }),
    },
    data: () => ({

    }),
    methods: {

    }
  }
</script>
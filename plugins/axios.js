export default function({ $axios, redirect }) {
  // $axios.onRequest((config) => {
  //   console.log('End request to ', $axios.defaults)
  //   // console.log(config)
  // })

  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)
    console.log('Erreur :', error)
    if (code === 400) {
      redirect('/400')
    }
  })
}

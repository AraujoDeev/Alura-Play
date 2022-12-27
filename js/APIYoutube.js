import constantes from '../constantes.js'

async function apiYoutube(id) {
  const respostaApiYoutube = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?id=${id}&key=${constantes.GOOGLE_API_KEY}&part=snippet,contentDetails,statistics,status`
  )
  const respostaApiYoutubeConvertida = await respostaApiYoutube.json()
  console.log(respostaApiYoutubeConvertida)

  return respostaApiYoutubeConvertida
}

export default apiYoutube

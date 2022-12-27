import { conectaApi } from './conectaApi.js'
import apiYoutube from './APIYoutube.js'

const formulario = document.querySelector('[data-formulario]')

async function criarVideo(event) {
  event.preventDefault()
  const imagem = document.querySelector('[data-imagem]').value
  const urlPadrao = document.querySelector('[data-url]').value
  const urlEmbed = urlPadrao.replace('watch?v=', 'embed/')

  const idVideo = urlEmbed.split('/')[4]

  const retornoDaApiYoutube = await apiYoutube(idVideo)

  const viewsCount = retornoDaApiYoutube.items[0].statistics.viewCount
  const tituloDoVideo = retornoDaApiYoutube.items[0].snippet.title

  let views = viewsCount

  if (viewsCount.length >= 4 && viewsCount.length <= 6) {
    views = `${(viewsCount / 1000).toFixed(1)} mil`
  } else if (viewsCount.length >= 7 && viewsCount.length <= 9) {
    views = `${(viewsCount / 1000000).toFixed(1)} mi de`
  } else if (viewsCount.length >= 10) {
    views = `${(viewsCount / 1000000000).toFixed(1)} bi de `
  }

  const viewsFinal = `${views} visualizações`

  try {
    await conectaApi.criaVideo(tituloDoVideo, viewsFinal, urlEmbed, imagem)

    window.location.href = '../pages/envio-concluido.html'
  } catch (e) {
    alert(e)
  }
}
formulario.addEventListener('submit', (event) => criarVideo(event))

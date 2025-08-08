# Discord Music Bot (DisTube + discord.js)

Un bot sencillo para reproducir música en canales de voz de Discord usando DisTube y discord.js v14. Soporta enlaces y búsquedas de YouTube, Spotify y SoundCloud mediante plugins.

## Características
- Reproduce por búsqueda o URL (YouTube, Spotify, SoundCloud)
- Manejo de cola y mensajes de estado básicos (now playing, added to queue, errores)
- Comando de texto con prefijo: `!play`

## Requisitos
- Node.js 18+
- Una app/bot de Discord con “Message Content Intent” activado

## Quick start
1) Instala dependencias:
```powershell
npm install
```
2) Configura credenciales (recomendado):
```powershell
Copy-Item .env.example .env
# Edita .env y pega tu DISCORD_TOKEN; opcional: SPOTIFY_CLIENT_ID/SECRET
```
3) Inicia el bot:
```powershell
npm start
```

## Uso
- Entra a un canal de voz
- En un canal de texto, escribe: `!play <búsqueda|URL>`

## Estructura mínima
```
index.js            # Carga eventos y hace login
bot/
  client.js         # Cliente de discord.js con intents
  distube.js        # Instancia y plugins de DisTube
  commands/
    play.js         # Comando !play
events/
  ready.js          # Listo/arranque
  messageCreate.js  # Enrutado de !play
  distube/
    playSong.js     # Mensaje "Now playing"
    addSong.js      # Mensaje "Added to queue"
    error.js        # Manejo de errores de DisTube
```

## Problemas que tuvimos y cómo los solucionamos
- Token expuesto o “Discord login failed”
  - Causa: token en `config.json` o inválido/rotado.
  - Fix: mover a `.env` (`DISCORD_TOKEN`), leer con `process.env.DISCORD_TOKEN`, agregar `.env` a `.gitignore` y rotar token en el Developer Portal.

- El bot no responde a `!play`
  - Causa: “Message Content Intent” desactivado, falta de permisos o el bot no está online.
  - Fix: activar el intent en el portal, verificar `GatewayIntentBits.MessageContent`, revisar permisos del bot en el canal.

- No se une al canal de voz o no se escucha
  - Causa: permisos “Connect”/“Speak” o codecs/FFmpeg.
  - Fix: otorgar permisos; el proyecto usa `ffmpeg-static` y trae codecs (`@discordjs/opus`/`opusscript`).

- Evento `error` de DisTube con firma diferente
  - Causa: variaciones entre versiones/plugins.
  - Fix: normalización de argumentos en `events/distube/error.js` para notificar bien y loguear fallback.

- Spotify 401/403
  - Causa: credenciales faltantes.
  - Fix: definir `SPOTIFY_CLIENT_ID` y `SPOTIFY_CLIENT_SECRET` en `.env`.

- Fallos esporádicos con YouTube/yt-dlp
  - Fix: actualizar `@distube/yt-dlp` y reintentar.

- Node incompatible
  - Fix: usar Node 18+.

## Nota de seguridad
El repo lee el token desde `config.json`. Recomendamos migrar a `.env` y nunca versionar secretos. Si tu token estuvo público, rótalo.

## Licencia
ISC.

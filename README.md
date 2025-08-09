# Discord Music Bot

A production-ready Discord music bot built with **discord.js v14** and **DisTube v5**. This project demonstrates enterprise-level software engineering practices including modular architecture, robust error handling, and scalable event-driven design.

## Technical Stack

- **Runtime**: Node.js 18+
- **Framework**: discord.js v14 with Gateway Intents
- **Music Engine**: DisTube v5 with official plugins
- **Audio Processing**: FFmpeg with @discordjs/opus
- **Platform Support**: YouTube, Spotify, SoundCloud integration

## Key Features

- **Multi-platform Music Streaming**: Support for YouTube, Spotify, and SoundCloud via search queries and direct URLs
- **Interactive UI Components**: Rich embeds with actionable buttons for seamless user experience
- **Queue Management**: Comprehensive playlist handling with real-time status updates
- **Robust Error Handling**: Graceful degradation with user-friendly error messages
- **Voice Channel Validation**: Permission-based access control and state management

## Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/J3r0x/DiscordBot.git
   cd DiscordBot
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Configuration**:
   ```json
   // config.json
   {
     "token": "YOUR_DISCORD_BOT_TOKEN"
   }
   ```

4. **Optional Spotify Integration**:
   ```bash
   # .env
   SPOTIFY_CLIENT_ID=your_client_id
   SPOTIFY_CLIENT_SECRET=your_client_secret
   ```

5. **Start the application**:
   ```bash
   npm start
   ```

## Project Architecture

## Project Architecture

```
src/
├── index.js                    # Application entry point with event loader
├── config.json                 # Bot authentication configuration
├── bot/
│   ├── client.js              # Discord.js client with optimized intents
│   ├── distube.js             # DisTube instance with plugin configuration
│   └── commands/              # Command handlers with business logic
│       ├── play.js            # Music playback with playlist support
│       ├── queue.js           # Queue display and management
│       ├── skip.js            # Track skipping with validation
│       └── stop.js            # Playback termination
├── events/                    # Event-driven architecture
│   ├── messageCreate.js       # Command routing and processing
│   ├── interactionCreate.js   # Button interaction handling
│   ├── ready.js               # Bot initialization and status
│   └── distube/               # DisTube event handlers
│       ├── playSong.js        # Now playing notifications
│       ├── addSong.js         # Queue addition events
│       └── error.js           # Centralized error handling
```

## Command Interface

| Command | Description | Usage |
|---------|-------------|-------|
| `!play` | Stream music from URL or search query | `!play <song/URL>` |
| `!queue` | Display current playlist | `!queue` |
| `!skip` | Skip to next track | `!skip` |
| `!stop` | Stop playback and clear queue | `!stop` |

## Interactive Components

- **Skip Button**: Advance to next track with validation
- **Stop Button**: Terminate playback with confirmation
- **Rich Embeds**: Real-time playback information with metadata

## Engineering Highlights

- **Modular Design**: Separation of concerns with clear boundaries between components
- **Error Resilience**: Comprehensive error handling preventing application crashes
- **State Management**: Robust queue state validation and edge case handling
- **Security**: Environment-based configuration management
- **Scalability**: Event-driven architecture supporting future feature expansion

## Dependencies

```json
{
  "discord.js": "^14.21.0",
  "distube": "^5.0.7",
  "@distube/spotify": "^2.0.2",
  "@distube/youtube": "^1.0.4",
  "@distube/yt-dlp": "^2.0.1",
  "ffmpeg-static": "^5.2.0"
}
```

## Contributing

This project follows industry best practices for maintainability and extensibility. Contributions are welcome following the established architectural patterns.

---

**Isaac Rivera** 
[GitHub](https://github.com/J3r0x)

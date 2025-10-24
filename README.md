# Discord Team Onboarding Bot 🤖

An automated Discord bot that welcomes new members, helps them select their team roles, and sends periodic reminders to those who haven't chosen a team yet.

## ✨ Features

- **Automated Welcome System**: Creates private channels for new members with team selection
- **Custom Team Messages**: Each team has a personalized welcome message
- **Auto-Cleanup**: Automatically deletes welcome channels after role assignment
- **Reminder System**: Checks every 30 minutes and reminds members without team roles
- **Admin Commands**: Slash commands for server statistics and manual reminders
- **Modular Structure**: Clean, maintainable code with proper folder organization

## 🚀 Quick Start

### Prerequisites

- Node.js v16.9.0 or higher
- A Discord bot token ([Create one here](https://discord.com/developers/applications))
- Administrator permissions in your Discord server

### Local Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd discord-bot
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your bot token:
   ```
   TOKEN=your_discord_bot_token_here
   ```

4. **Update team role IDs**
   
   Edit `src/config/teams.js` and replace the role IDs with your server's team role IDs.
   
   To get role IDs:
   - Enable Developer Mode in Discord (Settings → Advanced → Developer Mode)
   - Right-click a role and select "Copy ID"

5. **Run the bot**
   ```bash
   npm start
   ```

## 🌐 Deployment to Render.com

### Step 1: Push to GitHub

1. **Initialize git repository** (if not already done)
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Create a new repository on GitHub**
   - Go to [GitHub](https://github.com) and create a new repository
   - Don't initialize it with README, .gitignore, or license

3. **Push your code**
   ```bash
   git remote add origin https://github.com/your-username/your-repo-name.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Deploy to Render

1. **Create a Render account**
   - Go to [Render.com](https://render.com) and sign up
   - Connect your GitHub account

2. **Create a new Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure the service:
     - **Name**: discord-team-bot (or any name you prefer)
     - **Environment**: Node
     - **Build Command**: `npm install`
     - **Start Command**: `node index.js`
     - **Plan**: Free

3. **Add environment variables**
   - In the Render dashboard, go to "Environment"
   - Add your environment variable:
     - Key: `TOKEN`
     - Value: `your_discord_bot_token_here`

4. **Deploy**
   - Click "Create Web Service"
   - Render will automatically deploy your bot
   - Your bot will be online 24/7!

### Step 3: Auto-Deploy on Push

Render automatically redeploys your bot whenever you push changes to GitHub:

```bash
git add .
git commit -m "Your changes"
git push origin main
```

## 📋 Admin Commands

The bot includes slash commands for administrators:

- `/stats` - View server statistics and team assignment status
- `/remind` - Manually send reminders to all members without team roles
- `/config` - View current bot configuration settings

## ⚙️ Configuration

Edit `src/config/bot.js` to customize:

- `ROLE_CHECK_INTERVAL`: How often to check for members without roles (default: 30 minutes)
- `CHANNEL_DELETE_DELAY`: Delay before deleting welcome channels (default: 10 seconds)
- `AUTO_DELETE_CHANNELS`: Enable/disable auto-deletion (default: true)

## 📁 Project Structure

```
discord-bot/
├── src/
│   ├── commands/         # Slash commands
│   │   ├── stats.js      # Statistics command
│   │   ├── remind.js     # Manual reminder command
│   │   ├── config.js     # Configuration viewer
│   │   └── index.js      # Commands loader
│   ├── config/           # Configuration files
│   │   ├── bot.js        # Bot settings
│   │   └── teams.js      # Team definitions & messages
│   ├── events/           # Event handlers
│   │   ├── ready.js      # Bot ready event
│   │   ├── guildMemberAdd.js   # Member join event
│   │   └── interactionCreate.js # Interactions handler
│   └── utils/            # Utility functions
│       ├── channelManager.js   # Channel operations
│       └── embedBuilder.js     # Embed creators
├── index.js              # Main entry point
├── .env                  # Environment variables (not committed)
├── .env.example          # Example environment file
├── .gitignore            # Git ignore rules
├── package.json          # Dependencies
└── README.md            # This file
```

## 🔧 Customization

### Adding New Teams

Edit `src/config/teams.js` and add a new team object:

```javascript
{
  id: 'your_role_id',
  name: 'Team Name',
  emoji: '🎯',
  description: 'Team description',
  welcomeMessage: `Your custom welcome message here`,
}
```

### Changing Welcome Messages

Edit the `welcomeMessage` property in `src/config/teams.js` for any team.

### Adjusting Auto-Delete Timing

Edit `CHANNEL_DELETE_DELAY` in `src/config/bot.js`:

```javascript
CHANNEL_DELETE_DELAY: 10000, // milliseconds (10 seconds)
```

## 🐛 Troubleshooting

### Bot not responding
- Check that the bot is online in your server
- Verify your TOKEN in the `.env` file
- Ensure the bot has proper permissions (Administrator recommended)

### Commands not showing
- Wait a few minutes for Discord to register commands globally
- Try kicking and re-inviting the bot

### Channel auto-delete not working
- Check `AUTO_DELETE_CHANNELS` is `true` in `src/config/bot.js`
- Ensure bot has "Manage Channels" permission

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 💡 Support

If you need help, feel free to open an issue on GitHub.

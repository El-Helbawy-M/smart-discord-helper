export const TEAMS = [
  {
    id: '1429419593268596766',
    name: 'Mobile Team',
    emoji: '📱',
    description: 'iOS & Android development',
    welcomeMessage: `
🎉 **Welcome to the Mobile Team!** 📱

You're now part of our awesome mobile development squad! Here's what awaits you:

• 📱 Build cutting-edge iOS & Android apps
• 🚀 Work with the latest mobile technologies
• 💡 Collaborate on innovative mobile solutions
• 🎯 Shape the future of mobile experiences

**Next Steps:**
1. Check out our team channels for updates
2. Introduce yourself to the team
3. Review our current mobile projects

Let's build something amazing together! 🌟
    `,
  },
  {
    id: '1429422377556770847',
    name: 'Full Stack Team',
    emoji: '🌐',
    description: 'Frontend & Backend development',
    welcomeMessage: `
🎉 **Welcome to the Full Stack Team!** 🌐

You're now part of our versatile development powerhouse! Here's what's in store:

• 💻 Master both frontend & backend technologies
• 🔧 Build complete end-to-end solutions
• 🎨 Create beautiful interfaces with robust backends
• 🚀 Work across the entire development stack

**Next Steps:**
1. Explore our tech stack documentation
2. Meet your fellow full-stackers
3. Check out ongoing projects

Ready to code from database to UI? Let's go! 💪
    `,
  },
  {
    id: '1429423004298772511',
    name: 'Data Science Team',
    emoji: '📊',
    description: 'AI, ML & Analytics',
    welcomeMessage: `
🎉 **Welcome to the Data Science Team!** 📊

You're joining our data-driven innovation hub! Here's what you'll be doing:

• 🤖 Build AI & Machine Learning models
• 📈 Analyze data to drive business insights
• 🧠 Work with cutting-edge data technologies
• 💡 Turn data into actionable intelligence

**Next Steps:**
1. Access our data science resources
2. Connect with fellow data scientists
3. Review current ML projects

Let's unlock the power of data together! 🚀
    `,
  },
  {
    id: '1429425061659676756',
    name: 'QA Team',
    emoji: '🧪',
    description: 'Quality Assurance & Testing',
    welcomeMessage: `
🎉 **Welcome to the QA Team!** 🧪

You're now part of our quality guardians! Here's your mission:

• ✅ Ensure product quality and reliability
• 🔍 Find bugs before they reach production
• 🧪 Design comprehensive test strategies
• 🛡️ Be the shield of quality for our products

**Next Steps:**
1. Review our testing frameworks
2. Meet the QA champions
3. Check out our testing protocols

Let's make excellence our standard! 🌟
    `,
  },
  {
    id: '1429425478149603418',
    name: 'Product Design Team',
    emoji: '🎨',
    description: 'UI/UX & Product Design',
    welcomeMessage: `
🎉 **Welcome to the Product Design Team!** 🎨

You're joining our creative design studio! Here's what you'll create:

• 🎨 Design beautiful user interfaces
• 💡 Craft exceptional user experiences
• 🎯 Solve design challenges creatively
• ✨ Bring products to life visually

**Next Steps:**
1. Check out our design system
2. Meet your design teammates
3. Browse our portfolio of work

Let's design the future together! 🚀
    `,
  },
  {
    id: '1429425659653918814',
    name: 'HR Team',
    emoji: '👥',
    description: 'Human Resources',
    welcomeMessage: `
🎉 **Welcome to the HR Team!** 👥

You're now part of our people-first squad! Here's your role:

• 💼 Build an amazing workplace culture
• 🤝 Support team members' growth
• 🌟 Foster talent development
• 💪 Drive employee engagement

**Next Steps:**
1. Review our HR policies
2. Connect with the HR team
3. Check current HR initiatives

Let's make this the best place to work! ❤️
    `,
  },
  {
    id: '1429425837899382985',
    name: 'BA Team',
    emoji: '📋',
    description: 'Business Analysis',
    welcomeMessage: `
🎉 **Welcome to the BA Team!** 📋

You're joining our strategic analysis experts! Here's what you'll do:

• 📊 Analyze business requirements
• 🎯 Bridge business and technology
• 💡 Drive strategic decision-making
• 🔍 Uncover opportunities for growth

**Next Steps:**
1. Access our business analysis tools
2. Meet fellow business analysts
3. Review active projects

Let's turn insights into impact! 🚀
    `,
  },
  {
    id: '1429425942920560681',
    name: 'PMO Team',
    emoji: '📈',
    description: 'Project Management',
    welcomeMessage: `
🎉 **Welcome to the PMO Team!** 📈

You're now part of our project orchestration experts! Here's your mission:

• 📅 Lead projects to successful completion
• 🎯 Drive strategic project initiatives
• 🤝 Coordinate cross-functional teams
• 📊 Ensure projects stay on track

**Next Steps:**
1. Review our PM methodologies
2. Connect with other PMs
3. Check the project portfolio

Let's deliver excellence, on time! 💪
    `,
  },
  {
    id: '1429426131601326190',
    name: 'BD Team',
    emoji: '🤝',
    description: 'Business Development',
    welcomeMessage: `
🎉 **Welcome to the BD Team!** 🤝

You're joining our growth and partnerships squad! Here's what awaits:

• 🚀 Drive business growth
• 🤝 Build strategic partnerships
• 💼 Identify new opportunities
• 🌍 Expand our market reach

**Next Steps:**
1. Review our BD strategies
2. Meet the BD team members
3. Check current partnership opportunities

Let's grow together! 🌟
    `,
  },
  {
    id: '1429426260169195540',
    name: 'Finance Team',
    emoji: '💰',
    description: 'Financial Management',
    welcomeMessage: `
🎉 **Welcome to the Finance Team!** 💰

You're now part of our financial stewardship team! Here's your role:

• 💵 Manage financial operations
• 📊 Drive financial planning & analysis
• 🎯 Ensure fiscal responsibility
• 💡 Support strategic financial decisions

**Next Steps:**
1. Access our financial systems
2. Meet your finance colleagues
3. Review financial protocols

Let's ensure financial excellence! 📈
    `,
  },
];

// Export role IDs for easy access
export const TEAM_ROLE_IDS = TEAMS.map(team => team.id);

// Helper function to get team by ID
export function getTeamById(roleId) {
  return TEAMS.find(team => team.id === roleId);
}

// Helper function to build select menu options
export function getTeamSelectOptions() {
  return TEAMS.map(team => ({
    label: `${team.emoji} ${team.name}`,
    value: team.id,
    description: team.description,
  }));
}

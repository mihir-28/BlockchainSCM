// Collection of fun easter eggs for QR codes
export const qrEasterEggs = [
  // Blockchain jokes
  "My blockchain romance: we never break the chain",
  "I told my wife I work with blockchain. She still thinks I'm a plumber",
  "Blockchain: because trusting people is so 2008",
  "How many blockchain devs does it take to change a lightbulb? None, that's a hardware problem",

  // Supply chain puns
  "The blockchain never lies, unlike my ex who said they'd be back in the supply chain",
  "I'd tell you a joke about our supply chain, but it's still pending approval",
  "Our chain is so transparent, even my boss can't hide their vacation photos",
  "I'm the weakest link in our supply chain. I keep taking coffee breaks",

  // Crypto references
  "To the moon! (Just kidding, we're a serious business)",
  "If found, please return to Satoshi Nakamoto",
  "This product has travelled less distance than my crypto has fallen",
  "Not recommended for mining purposes",

  // Inside jokes for developers
  "This QR code will self-destruct in 5...4...3... (just kidding)",
  "Hello world! I mean... Hello customer!",
  "There are 10 types of people: those who understand binary and those who scan QR codes 01101000",
  "Fun fact: This QR contains no NFTs",

  // Product Authenticity Claims
  "This product is so authentic, even its blockchain records have blockchain records",
  "Warning: Counterfeit detectors may explode with excitement",
  "Verified by humans. And robots. The robots were more thorough",
  "So authentic we had to invent new math to measure it",

  // Secret Command Messages
  "You found the secret code! Try 'Up Up Down Down Left Right Left Right B A Start'",
  "Voice command activated: Say 'blockchain' three times fast",
  "Congratulations! You've found the easter egg. Your prize is this message",
  "Try scanning upside down for Australian mode",

  // BlockchainSCM specific jokes
  "404: Paper trail not found",
  "Trust issues? Our blockchain understands",
  "Making supply chains cool since 2023",
  "Blocks: chained. Data: secured. Coffee: needed.",

  // Movie references
  "I'll be block... I mean back",
  "May the blockchain be with you",
  "You shall not forge!",
  "First rule of Blockchain: You do talk about Blockchain",

  // Quotes "from the founder"
  "Our founder once said: 'It's not a bug, it's a consensus feature'",
  "'60% of the time, it works every time' - Our CTO",
  "'Let's put that on the blockchain' - Every meeting ever",
  "'It's pronounced block-CHAIN, not BLOCK-chain' - Intense office debate",

  // Tech humor
  "I put my private key in this QR code... Just kidding!",
  "Loading blockchain data... Please wait 150 years...",
  "I asked for a blockchain solution and all I got was this lousy QR code",
  "Blockchain: the solution for problems you didn't know you had",

  // Corporate meeting speak
  "Let's circle back on our blockchain synergies",
  "We're disrupting the disruption with blockchain disruption",
  "Our blockchain solution leverages enterprise-grade buzzwords",
  "This meeting could have been a smart contract",

  // Supply chain specifics
  "From farm to table to blockchain to your scanner",
  "This package has more tracking than your ex on social media",
  "If this product could talk, it would say 'stop scanning me!'",
  "I've been tracked in 37 locations and all I got was this QR code",

  // Breaking the fourth wall
  "Yes, someone spent time coding all these easter eggs",
  "Whoever made this QR code probably needs sleep",
  "You actually scanned this? We're impressed!",
  "Plot twist: This QR code is scanning YOU"
];

// Function to get a random easter egg
export const getRandomEasterEgg = () => {
  return qrEasterEggs[Math.floor(Math.random() * qrEasterEggs.length)];
};

// Function to get a product-specific easter egg (based on some input)
export const getProductEasterEgg = (productId) => {
  // Use the product ID to select a specific easter egg
  const index = parseInt(productId.substring(2, 4), 16) % qrEasterEggs.length;
  return qrEasterEggs[index];
};

// Create more structured easter egg objects if needed
export const easterEggCategories = {
  blockchain: qrEasterEggs.slice(0, 4),
  supplyChain: qrEasterEggs.slice(4, 8),
  crypto: qrEasterEggs.slice(8, 12),
  developer: qrEasterEggs.slice(12, 16),
  authenticity: qrEasterEggs.slice(16, 20),
  secret: qrEasterEggs.slice(20, 24),
  brandSpecific: qrEasterEggs.slice(24, 28),
  movies: qrEasterEggs.slice(28, 32),
  quotes: qrEasterEggs.slice(32, 36),
  tech: qrEasterEggs.slice(36, 40),
  corporate: qrEasterEggs.slice(40, 44),
  supplyChainSpecific: qrEasterEggs.slice(44, 48),
  fourthWall: qrEasterEggs.slice(48, 52)
};
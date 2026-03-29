export type Category = "Light" | "Heat" | "Motion" | "Sound" | "Forces" | "Electricity";

export interface Post {
  id: string;
  slug: string;
  title: string;
  teaser: string;
  category: Category;
  readTime: string;
  date: string;
  content: string[];
  pullQuote: string;
}

export const categories: Category[] = ["Light", "Heat", "Motion", "Sound", "Forces", "Electricity"];

export const categoryColors: Record<Category, string> = {
  Light: "bg-amber/20 text-amber",
  Heat: "bg-terracotta/20 text-terracotta",
  Motion: "bg-sage/20 text-sage",
  Sound: "bg-dusty-rose/20 text-dusty-rose",
  Forces: "bg-charcoal/10 text-charcoal",
  Electricity: "bg-amber/20 text-amber",
};

export const posts: Post[] = [
  {
    id: "1",
    slug: "why-soap-bubbles-are-round",
    title: "Why Soap Bubbles Are Round",
    teaser: "A soap bubble doesn't choose to be round. It's forced into it by the laziest principle in all of physics — minimum energy.",
    category: "Forces",
    readTime: "4 min",
    date: "Mar 24, 2026",
    pullQuote: "Nature is fundamentally lazy. Every system wants to settle into the state that costs the least energy — and for a bubble, that's a perfect sphere.",
    content: [
      "You blow a soap bubble, and it floats away — perfectly round, impossibly thin, shimmering with color. It looks like magic. But it's not. It's physics at its most elegant.",
      "A soap film is essentially a thin sandwich: two layers of soap molecules with a layer of water trapped between them. This film has surface tension — a force that tries to minimize the surface area. And here's the key insight: of all possible shapes that enclose a given volume of air, a sphere has the smallest surface area.",
      "This is known as the isoperimetric inequality, and it's been mathematically proven. Nature doesn't need the proof, though. The soap film simply finds the lowest-energy configuration, and that's always a sphere.",
      "But wait — what about those non-round bubbles you see right after blowing? Those are transient shapes, oscillating as the bubble settles. Air resistance, initial momentum, and turbulence create temporary distortions. But within milliseconds, surface tension pulls everything back into spherical perfection.",
      "The colors you see swirling on the surface? That's thin-film interference — light waves reflecting off the inner and outer surfaces of the soap film, interfering with each other. Different thicknesses produce different colors, which is why the pattern shifts as the film drains and thins under gravity.",
      "So the next time you see a soap bubble, remember: you're looking at a masterclass in optimization. Nature solving a calculus problem in real time, with nothing but soap and air.",
    ],
  },
  {
    id: "2",
    slug: "how-your-fridge-actually-works",
    title: "How Your Fridge Actually Works",
    teaser: "Your refrigerator doesn't create cold. It moves heat from inside to outside, using a clever trick with evaporating liquids.",
    category: "Heat",
    readTime: "5 min",
    date: "Mar 20, 2026",
    pullQuote: "Cold isn't a thing. It's an absence. Your fridge doesn't make cold — it steals heat and dumps it behind itself, where you can't feel it.",
    content: [
      "Open the back of your fridge and feel the warmth radiating off the coils. That warmth is the heat that used to be inside, keeping your leftovers chilled. Your fridge is not a cold-making machine — it's a heat-moving machine.",
      "The secret lies in a simple physical principle: when a liquid evaporates, it absorbs heat from its surroundings. You feel this every time you step out of a swimming pool on a breezy day. The water on your skin evaporates and you feel cold. The fridge uses this same trick, but in a controlled loop.",
      "A refrigerant — a special fluid with a very low boiling point — circulates through the system. Inside the fridge, the refrigerant evaporates at low pressure, absorbing heat from the food and air. It then gets compressed (which heats it up further), sent to the coils on the outside where it condenses back into a liquid, releasing that heat into your kitchen.",
      "The compressor is the heart of this cycle. It pressurizes the gaseous refrigerant, raising its temperature above room temperature so the heat can flow outward. Then an expansion valve drops the pressure again, cooling the refrigerant down so it can absorb more heat inside.",
      "It's a beautiful closed loop: evaporate, compress, condense, expand. The Second Law of Thermodynamics says heat won't flow from cold to hot on its own — but with a little work from the compressor, you can force it.",
    ],
  },
  {
    id: "3",
    slug: "why-the-sky-is-blue",
    title: "Why the Sky Is Blue",
    teaser: "Sunlight is white. Air is transparent. So why isn't the sky white or transparent? The answer is the size of air molecules.",
    category: "Light",
    readTime: "3 min",
    date: "Mar 15, 2026",
    pullQuote: "Blue light doesn't travel farther or faster. It just bounces around more — scattered in every direction by molecules barely bigger than its wavelength.",
    content: [
      "Sunlight looks white, but it's actually a mix of all visible colors — from red to violet. When this light enters Earth's atmosphere, it collides with nitrogen and oxygen molecules. And here's where things get interesting.",
      "These molecules are tiny — much smaller than the wavelength of visible light. When light waves interact with particles much smaller than their wavelength, something called Rayleigh scattering occurs. The probability of scattering is inversely proportional to the fourth power of wavelength.",
      "That means shorter wavelengths scatter far more than longer ones. Violet light scatters the most, then blue, then green, and so on down to red which scatters the least. So why isn't the sky violet?",
      "Two reasons. First, the sun emits more blue light than violet. Second, our eyes are more sensitive to blue than violet. The combination of these factors means we perceive the scattered light overhead as a rich, beautiful blue.",
      "At sunset, sunlight travels through much more atmosphere to reach your eyes. By the time it arrives, most of the blue has been scattered away, leaving the longer wavelengths — reds and oranges — to paint the sky in those warm, dramatic tones.",
    ],
  },
  {
    id: "4",
    slug: "why-you-can-hear-the-ocean-in-a-shell",
    title: "Why You Can Hear the Ocean in a Shell",
    teaser: "It's not the ocean. It's not blood flow either. It's the ambient noise around you, amplified and filtered by a resonant cavity.",
    category: "Sound",
    readTime: "3 min",
    date: "Mar 10, 2026",
    pullQuote: "The shell isn't recording the ocean. It's turning the noise that's already around you into something that sounds like waves — a resonant illusion.",
    content: [
      "Hold a seashell to your ear and you'll hear a soft, rushing sound — like distant ocean waves. It's one of those childhood experiences that feels genuinely magical. But the ocean isn't trapped inside the shell.",
      "What you're hearing is ambient sound — the hum of the room, distant traffic, air conditioning, your own body — being resonated and amplified by the shell's cavity. A seashell acts like a Helmholtz resonator, selectively amplifying certain frequencies of the noise around you.",
      "The shape and size of the shell determine which frequencies get boosted. Larger shells amplify lower frequencies, creating a deeper 'roar.' Smaller shells produce a higher-pitched rushing sound. The result sounds remarkably like ocean waves because the frequencies being amplified overlap with the broad, noisy spectrum of wave sounds.",
      "You can test this yourself: try the same trick with a cup or even just cupping your hand over your ear. You'll hear a similar (though less impressive) rushing sound. The shell is just better at it because of its spiral cavity.",
      "It's a beautiful example of resonance — the same principle that makes a guitar body amplify string vibrations or an opera singer shatter a glass. The noise was always there. The shell just gives it shape.",
    ],
  },
  {
    id: "5",
    slug: "why-ice-is-slippery",
    title: "Why Ice Is Slippery",
    teaser: "You'd think the answer is simple. It's not. Scientists debated this for over a century, and the real reason is stranger than you'd guess.",
    category: "Motion",
    readTime: "4 min",
    date: "Mar 5, 2026",
    pullQuote: "The surface of ice is always melting — even at temperatures well below freezing. It exists in a strange, liquid-like limbo that makes friction nearly vanish.",
    content: [
      "Ice is slippery. Everyone knows this. But if you ask a physicist why, you'll get a surprisingly complicated answer — because scientists have been arguing about it for over 150 years.",
      "The old explanation was pressure melting: your weight, concentrated on the thin blade of a skate, increases the pressure on the ice enough to lower its melting point and create a thin layer of water. Neat idea, but the math doesn't work out. The pressure from a skater isn't nearly enough to melt ice at typical skating temperatures.",
      "The real answer, supported by modern surface science, is that ice has a quasi-liquid layer on its surface — a thin film of molecules that aren't quite solid and aren't quite liquid. This layer exists because molecules at the surface of ice have fewer neighbors to bond with, so they vibrate more freely and behave more like a liquid.",
      "This premelting layer is incredibly thin — just a few nanometers — but it's enough to dramatically reduce friction. It's present even at temperatures far below 0°C, which is why ice is slippery even on a brutally cold day.",
      "Friction also plays a role: as you slide, the friction generates heat, which can melt additional ice and thicken the lubricating layer. So the slipperiness of ice is a collaboration between its inherent surface weirdness and the heat you generate by moving across it.",
    ],
  },
  {
    id: "6",
    slug: "how-lightning-works",
    title: "How Lightning Actually Works",
    teaser: "A bolt of lightning is five times hotter than the surface of the sun. And it starts with tiny ice crystals bumping into each other.",
    category: "Electricity",
    readTime: "5 min",
    date: "Feb 28, 2026",
    pullQuote: "Lightning is nature's way of fixing an imbalance — a massive spark that bridges the gap between billions of volts of frustrated charge.",
    content: [
      "A thunderstorm is an engine of charge separation. Inside a cumulonimbus cloud, updrafts carry water droplets upward where they freeze into ice crystals. As these crystals collide with heavier graupel (soft hail) falling downward, they exchange electric charge.",
      "The lighter ice crystals, now positively charged, get carried to the top of the cloud. The heavier graupel, negatively charged, accumulates near the bottom. This creates a massive electric field — a voltage difference that can reach hundreds of millions of volts.",
      "When the electric field becomes strong enough, it starts to ionize the air, creating a conductive channel called a stepped leader. This jagged, branching path works its way downward in discrete steps, each about 50 meters long, at about one-fifth the speed of light.",
      "As the leader approaches the ground, it induces positive charges on tall objects — trees, buildings, lightning rods. These positive charges reach upward as streamers. When a streamer connects with the stepped leader, the circuit is complete.",
      "What follows is the return stroke — a massive surge of current flowing upward through the established channel at one-third the speed of light. This is the blinding flash you see. The current heats the air to about 30,000°C, causing it to expand explosively. That rapid expansion is what you hear as thunder.",
      "A single lightning flash often contains multiple return strokes in rapid succession, which is why lightning appears to flicker. The whole event, from leader to final stroke, takes less than a second. But in that moment, nature moves more energy than a small power plant.",
    ],
  },
];

export interface Book {
  id: number;
  title: string;
  author: string;
  coverImage: string;
  description: string;
  rating: number;
  slug: string;
}

export const booksData: Book[] = [
  {
    id: 1,
    title: "The Silent Path",
    author: "Kabir Malhotra",
    coverImage: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=400&h=600&q=80",
    description: "A profound journey of self-discovery through quiet contemplation and the hidden paths of human connection.",
    rating: 5,
    slug: "the-silent-path"
  },
  {
    id: 2,
    title: "Shades Of Tomorrow",
    author: "Rohan Desai",
    coverImage: "https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?auto=format&fit=crop&w=400&h=600&q=80",
    description: "An inspiring exploration of hope, resilience, and the bright possibilities that await us in the coming days.",
    rating: 5,
    slug: "shades-of-tomorrow"
  },
  {
    id: 3,
    title: "Letters To Myself",
    author: "Ananya Roy",
    coverImage: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=400&h=600&q=80",
    description: "A beautiful collection of intimate letters reflecting on growth, healing, and finding peace within one's own heart.",
    rating: 5,
    slug: "letters-to-myself"
  },
  {
    id: 4,
    title: "The Power Within",
    author: "Priyansh Sharma",
    coverImage: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=400&h=600&q=80",
    description: "Discover the strength to overcome life's greatest obstacles by unlocking the latent potential hidden inside you.",
    rating: 5,
    slug: "the-power-within"
  },
  {
    id: 5,
    title: "Echoes Of Time",
    author: "Ishaan Kapoor",
    coverImage: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=400&h=600&q=80",
    description: "A captivating historical narrative tracing the memories and legacy of generations bound by love and destiny.",
    rating: 5,
    slug: "echoes-of-time"
  },
  {
    id: 6,
    title: "Beyond Limits",
    author: "Sneha Gupta",
    coverImage: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&h=600&q=80",
    description: "An adventurous tale of pushing boundaries, breaking barriers, and achieving the impossible against all odds.",
    rating: 5,
    slug: "beyond-limits"
  },
  {
    id: 7,
    title: "Dreams In Motion",
    author: "Aditya Sen",
    coverImage: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=400&h=600&q=80",
    description: "A dynamic guide to turning your aspirations into reality through action, perseverance, and creative thinking.",
    rating: 5,
    slug: "dreams-in-motion"
  },
  {
    id: 8,
    title: "Rise Again",
    author: "Vikram Joshi",
    coverImage: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=400&h=600&q=80",
    description: "A powerful story of triumph over adversity, detailing the resilience of the human spirit to soar once more.",
    rating: 5,
    slug: "rise-again"
  },
  {
    id: 9,
    title: "The Golden Horizon",
    author: "Meera Patel",
    coverImage: "https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=400&h=600&q=80",
    description: "An evocative story of new beginnings set against the backdrop of a changing world and endless hope.",
    rating: 5,
    slug: "the-golden-horizon"
  },
  {
    id: 10,
    title: "Whispers Of Destiny",
    author: "Neha Verma",
    coverImage: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=400&h=600&q=80",
    description: "A mysterious tale of fate, choices, and the silent whispers that guide us toward our true path in life.",
    rating: 5,
    slug: "whispers-of-destiny"
  }
];

export interface Store {
  id: string;
  name: string;
  color: string;
  logo: string;
  imageUrl: string;
}

export const STORES: Record<string, Store> = {
  steam: { id: 'steam', name: 'Steam', color: '#171a21', logo: 'S', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/83/Steam_icon_logo.svg' },
  epic: { id: 'epic', name: 'Epic Games', color: '#313131', logo: 'E', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/31/Epic_Games_logo.svg' },
  psn: { id: 'psn', name: 'PlayStation Store', color: '#003791', logo: 'PS', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/00/PlayStation_logo.svg' },
  xbox: { id: 'xbox', name: 'Xbox Store', color: '#107c10', logo: 'X', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d7/Xbox_logo_%282019%29.svg' },
};

export interface Game {
  id: string;
  title: string;
  coverImage: string;
  description: string;
  rating: number;
  originalPrice: number;
  currentPrice: number;
  discount: number;
  storeId: string;
  platforms: string[];
  genres: string[];
  releaseDate: string;
  prices: { storeId: string; price: number; url: string }[];
  priceHistory: { date: string; price: number }[];
}

export const MOCK_GAMES: Game[] = [
  {
    id: '1',
    title: 'Cyberpunk 2077',
    coverImage: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1091500/library_600x900_2x.jpg',
    description: 'Cyberpunk 2077 is an open-world, action-adventure story set in Night City, a megalopolis obsessed with power, glamour and body modification.',
    rating: 4.2,
    originalPrice: 199.90,
    currentPrice: 99.95,
    discount: 50,
    storeId: 'steam',
    platforms: ['PC', 'PlayStation', 'Xbox'],
    genres: ['RPG', 'Ação', 'Ficção Científica', 'Mundo Aberto'],
    releaseDate: '2020-12-10',
    prices: [
      { storeId: 'steam', price: 99.95, url: '#' },
      { storeId: 'epic', price: 105.00, url: '#' },
      { storeId: 'psn', price: 120.00, url: '#' },
    ],
    priceHistory: [
      { date: 'Jan', price: 199.90 },
      { date: 'Feb', price: 149.90 },
      { date: 'Mar', price: 99.95 },
      { date: 'Apr', price: 99.95 },
    ]
  },
  {
    id: '2',
    title: 'Elden Ring',
    coverImage: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1245620/library_600x900_2x.jpg',
    description: 'Rise, Tarnished, and be guided by grace to brandish the power of the Elden Ring and become an Elden Lord in the Lands Between.',
    rating: 4.9,
    originalPrice: 249.90,
    currentPrice: 174.93,
    discount: 30,
    storeId: 'steam',
    platforms: ['PC', 'PlayStation', 'Xbox'],
    genres: ['RPG', 'Ação', 'Souls-like', 'Fantasia Escura'],
    releaseDate: '2022-02-25',
    prices: [
      { storeId: 'steam', price: 174.93, url: '#' },
      { storeId: 'epic', price: 169.90, url: '#' },
      { storeId: 'psn', price: 199.90, url: '#' },
    ],
    priceHistory: [
      { date: 'Jan', price: 249.90 },
      { date: 'Feb', price: 249.90 },
      { date: 'Mar', price: 199.90 },
      { date: 'Apr', price: 174.93 },
    ]
  },
  {
    id: '3',
    title: 'Red Dead Redemption 2',
    coverImage: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1174180/library_600x900_2x.jpg',
    description: 'Winner of over 175 Game of the Year Awards and recipient of over 250 perfect scores, RDR2 is the epic tale of outlaw Arthur Morgan.',
    rating: 4.8,
    originalPrice: 299.90,
    currentPrice: 98.96,
    discount: 67,
    storeId: 'epic',
    platforms: ['PC', 'PlayStation', 'Xbox'],
    genres: ['Ação', 'Aventura', 'Mundo Aberto', 'História Rica'],
    releaseDate: '2019-11-05',
    prices: [
      { storeId: 'epic', price: 98.96, url: '#' },
      { storeId: 'steam', price: 99.90, url: '#' },
      { storeId: 'xbox', price: 120.00, url: '#' },
    ],
    priceHistory: [
      { date: 'Jan', price: 149.90 },
      { date: 'Feb', price: 149.90 },
      { date: 'Mar', price: 98.96 },
      { date: 'Apr', price: 98.96 },
    ]
  },
  {
    id: '4',
    title: 'The Witcher 3: Wild Hunt',
    coverImage: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/292030/library_600x900_2x.jpg',
    description: 'You are Geralt of Rivia, mercenary monster slayer. Before you stands a war-torn, monster-infested continent you can explore at will.',
    rating: 4.9,
    originalPrice: 159.90,
    currentPrice: 39.97,
    discount: 75,
    storeId: 'steam',
    platforms: ['PC', 'PlayStation', 'Xbox'],
    genres: ['RPG', 'Mundo Aberto', 'Fantasia', 'História Rica'],
    releaseDate: '2015-05-18',
    prices: [
      { storeId: 'steam', price: 39.97, url: '#' },
      { storeId: 'psn', price: 45.00, url: '#' },
      { storeId: 'xbox', price: 45.00, url: '#' },
    ],
    priceHistory: [
      { date: 'Jan', price: 79.90 },
      { date: 'Feb', price: 39.97 },
      { date: 'Mar', price: 159.90 },
      { date: 'Apr', price: 39.97 },
    ]
  },
  {
    id: '5',
    title: 'Hogwarts Legacy',
    coverImage: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/990080/library_600x900_2x.jpg',
    description: 'Hogwarts Legacy is an immersive, open-world action RPG set in the world first introduced in the Harry Potter books.',
    rating: 4.5,
    originalPrice: 249.90,
    currentPrice: 124.95,
    discount: 50,
    storeId: 'psn',
    platforms: ['PC', 'PlayStation', 'Xbox'],
    genres: ['RPG', 'Aventura', 'Magia', 'Mundo Aberto'],
    releaseDate: '2023-02-10',
    prices: [
      { storeId: 'psn', price: 124.95, url: '#' },
      { storeId: 'steam', price: 149.90, url: '#' },
      { storeId: 'epic', price: 149.90, url: '#' },
    ],
    priceHistory: [
      { date: 'Jan', price: 249.90 },
      { date: 'Feb', price: 199.90 },
      { date: 'Mar', price: 149.90 },
      { date: 'Apr', price: 124.95 },
    ]
  },
  {
    id: '6',
    title: 'God of War',
    coverImage: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1593500/library_600x900_2x.jpg',
    description: 'His vengeance against the Gods of Olympus years behind him, Kratos now lives as a man in the realm of Norse Gods and monsters.',
    rating: 4.8,
    originalPrice: 199.90,
    currentPrice: 99.95,
    discount: 50,
    storeId: 'steam',
    platforms: ['PC', 'PlayStation'],
    genres: ['Ação', 'Aventura', 'Mitologia', 'Hack and Slash'],
    releaseDate: '2022-01-14',
    prices: [
      { storeId: 'steam', price: 99.95, url: '#' },
      { storeId: 'psn', price: 99.50, url: '#' },
      { storeId: 'epic', price: 99.95, url: '#' },
    ],
    priceHistory: [
      { date: 'Jan', price: 199.90 },
      { date: 'Feb', price: 99.95 },
      { date: 'Mar', price: 199.90 },
      { date: 'Apr', price: 99.95 },
    ]
  },
  {
    id: '7',
    title: 'Hollow Knight',
    coverImage: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/367520/library_600x900_2x.jpg',
    description: 'Forge your own path in Hollow Knight! An epic action adventure through a vast ruined kingdom of insects and heroes.',
    rating: 4.9,
    originalPrice: 46.99,
    currentPrice: 23.49,
    discount: 50,
    storeId: 'steam',
    platforms: ['PC', 'PlayStation', 'Xbox'],
    genres: ['Indie', 'Metroidvania', 'Plataforma', 'Difícil'],
    releaseDate: '2017-02-24',
    prices: [
      { storeId: 'steam', price: 23.49, url: '#' },
      { storeId: 'epic', price: 23.49, url: '#' },
      { storeId: 'psn', price: 30.00, url: '#' },
    ],
    priceHistory: [
      { date: 'Jan', price: 46.99 },
      { date: 'Feb', price: 46.99 },
      { date: 'Mar', price: 23.49 },
      { date: 'Apr', price: 23.49 },
    ]
  },
  {
    id: '8',
    title: 'Resident Evil 4',
    coverImage: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2050650/library_600x900_2x.jpg',
    description: 'Survival is just the beginning. Six years have passed since the biological disaster in Raccoon City.',
    rating: 4.8,
    originalPrice: 249.00,
    currentPrice: 124.50,
    discount: 50,
    storeId: 'psn',
    platforms: ['PC', 'PlayStation', 'Xbox'],
    genres: ['Terror', 'Sobrevivência', 'Ação', 'Zumbis'],
    releaseDate: '2023-03-24',
    prices: [
      { storeId: 'psn', price: 124.50, url: '#' },
      { storeId: 'steam', price: 124.50, url: '#' },
      { storeId: 'xbox', price: 130.00, url: '#' },
    ],
    priceHistory: [
      { date: 'Jan', price: 249.00 },
      { date: 'Feb', price: 199.00 },
      { date: 'Mar', price: 124.50 },
      { date: 'Apr', price: 124.50 },
    ]
  },
  {
    id: '9',
    title: 'DOOM Eternal',
    coverImage: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/782330/library_600x900_2x.jpg',
    description: 'Hell’s armies have invaded Earth. Become the Slayer in an epic single-player campaign to conquer demons across dimensions.',
    rating: 4.7,
    originalPrice: 149.00,
    currentPrice: 37.25,
    discount: 75,
    storeId: 'xbox',
    platforms: ['PC', 'PlayStation', 'Xbox'],
    genres: ['FPS', 'Ação', 'Gore', 'Demônios'],
    releaseDate: '2020-03-20',
    prices: [
      { storeId: 'xbox', price: 37.25, url: '#' },
      { storeId: 'steam', price: 37.25, url: '#' },
      { storeId: 'psn', price: 40.00, url: '#' },
    ],
    priceHistory: [
      { date: 'Jan', price: 149.00 },
      { date: 'Feb', price: 74.50 },
      { date: 'Mar', price: 37.25 },
      { date: 'Apr', price: 37.25 },
    ]
  },
  {
    id: '10',
    title: 'Stardew Valley',
    coverImage: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/413150/library_600x900_2x.jpg',
    description: 'You\'ve inherited your grandfather\'s old farm plot in Stardew Valley. Armed with hand-me-down tools and a few coins, you set out to begin your new life.',
    rating: 4.9,
    originalPrice: 24.99,
    currentPrice: 19.99,
    discount: 20,
    storeId: 'steam',
    platforms: ['PC', 'PlayStation', 'Xbox', 'Mobile'],
    genres: ['Indie', 'Simulação', 'RPG', 'Agricultura', 'Casual'],
    releaseDate: '2016-02-26',
    prices: [
      { storeId: 'steam', price: 19.99, url: '#' },
      { storeId: 'epic', price: 19.99, url: '#' },
      { storeId: 'psn', price: 24.99, url: '#' },
    ],
    priceHistory: [
      { date: 'Jan', price: 24.99 },
      { date: 'Feb', price: 24.99 },
      { date: 'Mar', price: 19.99 },
      { date: 'Apr', price: 19.99 },
    ]
  }
];

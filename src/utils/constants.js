export const STATUS_TYPES = {
  TO_WATCH: 'to_watch',
  WATCHED: 'watched',
  PAUSED: 'paused',
  DROPPED: 'dropped',
}

export const STATUS_LABELS = {
  to_watch: 'Por ver',
  watched: 'Visto',
  paused: 'Pausada',
  dropped: 'Abandonada',
}

export const PLATFORM_TYPES = {
  NETFLIX: 'netflix',
  HBO: 'hbo',
  PRIME: 'prime',
  DISNEY: 'disney',
  APPLE: 'apple',
  PARAMOUNT: 'paramount',
  OTHER: 'other',
  PHYSICAL: 'physical',
  CINEMA: 'cinema',
}

export const PLATFORM_LABELS = {
  netflix: 'Netflix',
  hbo: 'HBO Max',
  prime: 'Prime Video',
  disney: 'Disney+',
  apple: 'Apple TV+',
  paramount: 'Paramount+',
  other: 'Otra plataforma',
  physical: 'Físico',
  cinema: 'Cine',
}

export const STORAGE_KEY = 'media_tracker_items'

export const SEED_ITEMS = [
  {
    id: '1',
    title: 'Breaking Bad',
    year: 2008,
    description: 'Un profesor de química de secundaria con cáncer terminal se asocia con un exalumno para fabricar y vender metanfetamina.',
    status: 'watched',
    platform: 'netflix',
    cover: 'https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'The Sopranos',
    year: 1999,
    description: 'Tony Soprano, un mafioso de Nueva Jersey, intenta equilibrar las exigencias de su organización criminal y su vida familiar.',
    status: 'watched',
    platform: 'hbo',
    cover: 'https://image.tmdb.org/t/p/w500/reEMJA1uzscCbkpeRJeTT2bjqUp.jpg',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Better Call Saul',
    year: 2015,
    description: 'La historia del abogado Jimmy McGill y su transformación en el abogado criminal Walter White.',
    status: 'paused',
    platform: 'netflix',
    cover: 'https://image.tmdb.org/t/p/w500/suaEOtk1N1sgg2MTM7oZd2cfVp3.jpg',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'Mad Men',
    year: 2007,
    description: 'La vida de los publicitarios más exitosos de Madison Avenue en los años 60.',
    status: 'to_watch',
    platform: '',
    cover: 'https://image.tmdb.org/t/p/w500/r7r8I9qGc8pTq2dH2uWxXj3L9H.jpg',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '5',
    title: 'The Wire',
    year: 2002,
    description: 'Un drama que explora la vida en Baltimore desde múltiples perspectivas: policía, tráfico de drogas, política y medios.',
    status: 'dropped',
    platform: 'hbo',
    cover: 'https://image.tmdb.org/t/p/w500/2Tm5W3Z7T3p3X3p3X3p3X3p3X3p3X3.jpg',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '6',
    title: 'Severance',
    year: 2022,
    description: 'Una oficina donde los empleados someten sus recuerdos laborales a un procedimiento de separación.',
    status: 'watched',
    platform: 'other',
    platform_other: 'Apple TV+',
    cover: 'https://image.tmdb.org/t/p/w500/7vjaCdMw15FEbXyLQTVa04URsPm.jpg',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

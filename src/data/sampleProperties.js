// ============================================================================
// sampleProperties.js
//
// Fallback data with the EXACT same shape as the Supabase table.
//
// Why keep this? A hackathon demo must never open to a blank page. If the
// .env file is missing, the key is wrong, or the table is empty, the app
// shows these rows instead and prints a small banner explaining why.
// It also doubles as the seed data in supabase-schema.sql.
//
// Note: plots have no bedrooms/bathrooms, so those fields are null.
// ============================================================================

export const sampleProperties = [
  {
    id: 1,
    title: 'Skyline Residency',
    location: 'Andheri West, Mumbai',
    price: 8500000,
    type: 'Apartment',
    listing_type: 'Buy',
    bedrooms: 3,
    bathrooms: 2,
    area: 1250,
    description:
      'A bright 3BHK on the 11th floor with an open city view, covered parking and 24x7 security. Walking distance from the metro station.',
    image_url:
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 2,
    title: 'Green Meadows Villa',
    location: 'Whitefield, Bengaluru',
    price: 12500000,
    type: 'Villa',
    listing_type: 'Buy',
    bedrooms: 4,
    bathrooms: 3,
    area: 2400,
    description:
      'Spacious villa in a gated community with a private garden, clubhouse access and a rooftop terrace. Perfect for a growing family.',
    image_url:
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 3,
    title: 'Cozy Studio Loft',
    location: 'Koramangala, Bengaluru',
    price: 22000,
    type: 'Studio',
    listing_type: 'Rent',
    bedrooms: 1,
    bathrooms: 1,
    area: 480,
    description:
      'Fully furnished studio in the heart of the startup district. Includes a work desk, high-speed internet and a shared terrace.',
    image_url:
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 4,
    title: 'Lakeview Apartment',
    location: 'Powai, Mumbai',
    price: 45000,
    type: 'Apartment',
    listing_type: 'Rent',
    bedrooms: 2,
    bathrooms: 2,
    area: 980,
    description:
      'Semi-furnished 2BHK overlooking the lake promenade. Gym and swimming pool in the society, with easy access to the IT park.',
    image_url:
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 5,
    title: 'Palm Grove House',
    location: 'Hinjewadi, Pune',
    price: 9800000,
    type: 'Independent House',
    listing_type: 'Buy',
    bedrooms: 3,
    bathrooms: 2,
    area: 1600,
    description:
      'Independent house on a quiet lane with a private car porch and a small front lawn. Close to schools and the IT corridor.',
    image_url:
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 6,
    title: 'Urban Nest 2BHK',
    location: 'Gachibowli, Hyderabad',
    price: 28000,
    type: 'Apartment',
    listing_type: 'Rent',
    bedrooms: 2,
    bathrooms: 2,
    area: 1050,
    description:
      'Newly built 2BHK with modular kitchen and a large balcony. Society has a gym, park and covered parking.',
    image_url:
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 7,
    title: 'Sunrise Villa',
    location: 'Candolim, Goa',
    price: 18500000,
    type: 'Villa',
    listing_type: 'Buy',
    bedrooms: 5,
    bathrooms: 4,
    area: 3200,
    description:
      'Holiday villa a short walk from the beach, with a private pool, landscaped garden and an attached guest cottage.',
    image_url:
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 8,
    title: 'Metro Heights Flat',
    location: 'Saket, New Delhi',
    price: 62000,
    type: 'Apartment',
    listing_type: 'Rent',
    bedrooms: 3,
    bathrooms: 2,
    area: 1400,
    description:
      'Well-maintained 3BHK beside the metro line. Includes a servant room, power backup and two covered parking spots.',
    image_url:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 9,
    title: 'Serene Plot',
    location: 'Devanahalli, Bengaluru',
    price: 4500000,
    type: 'Plot',
    listing_type: 'Buy',
    bedrooms: null,
    bathrooms: null,
    area: 2400,
    description:
      'Corner plot in a gated layout with wide internal roads, drainage and street lighting already in place. Ready to build.',
    image_url:
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 10,
    title: 'Heritage Row House',
    location: 'Alwarpet, Chennai',
    price: 11500000,
    type: 'Independent House',
    listing_type: 'Buy',
    bedrooms: 4,
    bathrooms: 3,
    area: 2100,
    description:
      'Classic row house with high ceilings and a private courtyard, recently renovated with modern wiring and plumbing.',
    image_url:
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1000&q=80',
  },
]

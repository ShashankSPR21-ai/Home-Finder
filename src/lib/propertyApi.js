// ============================================================================
// propertyApi.js
//
// All database work lives here so the components stay simple.
//
//   fetchProperties()              -> load every property from Supabase
//   filterProperties(list, filters) -> apply the search/filter rules
//
// Fetching ALL rows once and filtering in the browser keeps this beginner
// friendly: one network request, instant filtering as the user types.
// (A production app would push the filters into the query instead.)
// ============================================================================

import { supabase, isSupabaseConfigured } from './supabaseClient'
import { sampleProperties } from '../data/sampleProperties'

/**
 * Loads every property, ordered by id.
 * Always resolves to: { properties, source, message }
 *   source: 'supabase' | 'sample'
 *   message: a short note shown as a banner in the UI (may be '')
 */
export async function fetchProperties() {
  // 1. No .env values yet -> use the built-in sample data.
  if (!isSupabaseConfigured) {
    return {
      properties: sampleProperties,
      source: 'sample',
      message:
        'Showing demo data. Add your Supabase URL and key to .env to load live listings.',
    }
  }

  // 2. Ask Supabase for the table. "select('*')" means "all columns".
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .order('id', { ascending: true })

  // 3. On any problem (wrong key, table missing, offline...) fall back to
  //    sample data so the demo never shows an empty page.
  if (error) {
    console.error('Supabase error:', error.message)
    return {
      properties: sampleProperties,
      source: 'sample',
      message: `Could not reach Supabase (${error.message}). Showing demo data.`,
    }
  }

  // 4. Table exists but is empty.
  if (!data || data.length === 0) {
    return {
      properties: sampleProperties,
      source: 'sample',
      message:
        'Your "properties" table is empty. Run supabase-schema.sql to insert the sample rows. Showing demo data.',
    }
  }

  // 5. Success - live data from Supabase.
  return { properties: data, source: 'supabase', message: '' }
}

/**
 * Pure function: takes the full list + the current filter values and
 * returns only the properties that match.
 *
 * Filters:
 *   location     - text, matched against the title and location
 *   listingType  - 'All' | 'Buy' | 'Rent'
 *   type         - 'All' | 'Apartment' | 'Villa' | ...
 *   minPrice     - number as string, '' means "no minimum"
 *   maxPrice     - number as string, '' means "no maximum"
 */
export function filterProperties(properties, filters) {
  const location = (filters.location || '').trim().toLowerCase()
  const minPrice = filters.minPrice === '' || filters.minPrice == null ? null : Number(filters.minPrice)
  const maxPrice = filters.maxPrice === '' || filters.maxPrice == null ? null : Number(filters.maxPrice)

  return properties.filter((property) => {
    // --- Location / keyword ---
    if (location) {
      const searchable = `${property.title} ${property.location}`.toLowerCase()
      if (!searchable.includes(location)) return false
    }

    // --- Buy or Rent ---
    if (filters.listingType && filters.listingType !== 'All') {
      if (property.listing_type !== filters.listingType) return false
    }

    // --- Property type ---
    if (filters.type && filters.type !== 'All') {
      if (property.type !== filters.type) return false
    }

    // --- Price range (ignored when the box is empty) ---
    const price = Number(property.price)
    if (minPrice !== null && !Number.isNaN(minPrice) && price < minPrice) return false
    if (maxPrice !== null && !Number.isNaN(maxPrice) && price > maxPrice) return false

    return true
  })
}

// A tidy list of choices for the dropdowns, kept in one obvious place.
export const PROPERTY_TYPES = [
  'Apartment',
  'Villa',
  'Independent House',
  'Studio',
  'Plot',
]

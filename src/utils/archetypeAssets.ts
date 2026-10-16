import { PersonalityArchetypeId } from '../types';

/** Shared transparent character art used by result cards and the gallery. */
export function getArchetypeImage(id: PersonalityArchetypeId): string {
  // Refresh cached images when publishing the approved character artwork.
  return `/assets/archetypes/${id}.png?v=chibi-20261016`;
}

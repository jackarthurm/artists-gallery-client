import { environment } from '@envs/environment';
import { GalleryItem } from '@models/image';
import { uuid } from '@models/shared';


export function setGalleryState(galleryItems: Array<GalleryItem>): Array<uuid> {

  const galleryState: Array<uuid> = galleryItems.map(
    (item: GalleryItem) => item.id
  );

  sessionStorage.setItem(
      environment.galleryStateSessionStorageKey,
      JSON.stringify(galleryState)
  );

  return galleryState;
}

export function getGalleryState(): Array<uuid> | undefined {

  const galleryStateData: string | null = sessionStorage.getItem(
    environment.galleryStateSessionStorageKey
  );

  if (galleryStateData) {

    try {
      return JSON.parse(galleryStateData);
    }
    catch {}
  }
}

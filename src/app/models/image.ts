import { url, uuid } from '@models//shared';


// Model definitions
export interface Image {
  url: url;
  height: number;
  width: number;
}

export interface GalleryItem {
  id: uuid;
  originalImage: Image;
  largeImage: Image;
  thumbnailImage: Image;
  title: string;
  createdDate: Date | undefined;
  description: string;
  mediaDescription: string;
  sizeDescription: string;
  artistName: string;
  tags: Array<string>;
}

export interface GalleryPage {
  pageIndex: number;
  itemCount: number;
  nextPage?: url;
  previousPage?: url;
  items: Array<GalleryItem>;
}

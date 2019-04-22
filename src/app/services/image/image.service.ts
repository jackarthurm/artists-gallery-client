import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { makeURL } from '@app/models/environment';
import { url, uuid } from '@app/models/shared';
import { environment } from '@envs/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


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

// API schema definition
interface GalleryItemListAPIResult {
  count: number;
  next: url | null;
  previous: url | null;
  results: Array<GalleryItemAPIResult>;
}

interface GalleryItemAPITagResult {
  name: string;
}

interface GalleryItemAPIResult {
  id: uuid;
  original_image: Image;
  large_image: Image;
  thumbnail_image: Image;
  title: string;
  created_date: string | null;
  description: string;
  media_description: string;
  artist_name: string;
  tags: Array<GalleryItemAPITagResult>;
}

// Mapping layer
function galleryItemResult(res: GalleryItemAPIResult): GalleryItem {

  const createdDate: Date | undefined = res.created_date ? new Date(res.created_date) : undefined;

  return {
    id: res.id,
    originalImage: res.original_image,
    largeImage: res.large_image,
    thumbnailImage: res.thumbnail_image,
    title: res.title,
    createdDate,
    description: res.description,
    mediaDescription: res.media_description,
    artistName: res.artist_name,
    tags: res.tags.map(
      (tag: GalleryItemAPITagResult) => tag.name
    ),
  };
}

function galleryPageResult(
  res: GalleryItemListAPIResult,
  pageIndex: number
): GalleryPage {

  return {
    pageIndex,
    itemCount: res.count,
    nextPage: res.next || undefined,
    previousPage: res.previous || undefined,
    items: res.results.map(galleryItemResult),
  };
}


@Injectable({
  providedIn: 'root',
})
export class ImageService {

  constructor(private http: HttpClient) {}

  public getImage(location: url): Observable<Blob> {
    /* Retrieve an image file in blob format */

    const headers: HttpHeaders = new HttpHeaders({
      Accept: 'application/octet-stream',
    });

    return this.http.get<Blob>(
      location,
      {
        headers,
        responseType: 'blob' as 'json',
      }
    );
  }

  public getGalleryItem(imageID: uuid): Observable<GalleryItem> {

    const headers: HttpHeaders = new HttpHeaders({
      Accept: 'application/json',
    });

    return this.http.get<GalleryItemAPIResult>(
      `${makeURL(environment.imagesURL)}${imageID}/`,
      {
        headers,
        responseType: 'json',
      }
    ).pipe(
      map(
        (res: GalleryItemAPIResult) => galleryItemResult(res)
      )
    );
  }

  public getInitialGalleryPage(): Observable<GalleryPage> {

    return this.getGalleryPage(1, 100);  // TODO: Pagination
  }

  public getGalleryPage(
    pageIndex: number,
    pageSize: number
  ): Observable<GalleryPage> {

    const headers: HttpHeaders = new HttpHeaders({
      Accept: 'application/json',
    });

    return this.http.get<GalleryItemListAPIResult>(
      `${environment.imagesURL.schema}://${environment.imagesURL.domain}${environment.imagesURL.ext}`,
      {
        headers,
        params: {
          page: pageIndex.toString(),
          size: pageSize.toString(),
        },
        responseType: 'json',
      }
    ).pipe(
      map(
        (page: GalleryItemListAPIResult) => galleryPageResult(page, pageIndex)
      )
    );
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map, retry } from 'rxjs/operators';

import { environment } from '@envs/environment';
import { makeURL } from '@models/environment';
import { GalleryItem, GalleryPage, Image } from '@models/image';
import { url, uuid } from '@models/shared';


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
  large_image: Image;
  thumbnail_image: Image;
  title: string;
  created_date: string | null;
  description: string;
  media_description: string;
  size_description: string;
  artist_name: string;
  tags: Array<GalleryItemAPITagResult>;
}

// Mapping layer
function galleryItemResult(res: GalleryItemAPIResult): GalleryItem {

  const createdDate: Date | undefined = res.created_date ? new Date(
    res.created_date
  ) : undefined;

  return {
    id: res.id,
    largeImage: res.large_image,
    thumbnailImage: res.thumbnail_image,
    title: res.title,
    createdDate,
    description: res.description,
    mediaDescription: res.media_description,
    sizeDescription: res.size_description,
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
      retry(environment.requestRetryAttempts),
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
      makeURL(environment.imagesURL),
      {
        headers,
        params: {
          page: pageIndex.toString(),
          size: pageSize.toString(),
        },
        responseType: 'json',
      }
    ).pipe(
      retry(environment.requestRetryAttempts),
      map(
        (page: GalleryItemListAPIResult) => galleryPageResult(page, pageIndex)
      )
    );
  }
}

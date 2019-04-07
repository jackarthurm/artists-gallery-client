import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { uuid, url } from '@app/models/shared';
import { environment } from '@envs/environment'
import { map } from 'rxjs/operators';
import { makeURL } from '@app/models/environment';


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
  createdDate: Date;
  description: string;
  mediaDescription: string;
  artistName: string;
  tags: Array<string>;
}

export interface GalleryPage {
  pageIndex: number;
  itemCount: number;
  nextPage: url | null;
  previousPage: url | null;
  items: Array<GalleryItem>
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
  return {
    id: res.id,
    originalImage: res.original_image,
    largeImage: res.large_image,
    thumbnailImage: res.thumbnail_image,
    title: res.title,
    createdDate: new Date(res.created_date),
    description: res.description,
    mediaDescription: res.media_description,
    artistName: res.artist_name,
    tags: res.tags.map(
      (tag: GalleryItemAPITagResult) => tag.name
    )
  };
}

function galleryPageResult(
  res: GalleryItemListAPIResult, 
  pageIndex: number
): GalleryPage {

  return {
    pageIndex: pageIndex,
    itemCount: res.count,
    nextPage: res.next,
    previousPage: res.previous,
    items: res.results.map(galleryItemResult)
  }
}


@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private _http: HttpClient) {}

  getImage(location: url): Observable<Blob> {
    /* Retrieve an image file in blob format */

    console.log(location);

    const headers: HttpHeaders = new HttpHeaders({
      'Accept': 'application/octet-stream'
    });

    return this._http.get<Blob>(
      location,
      {
        headers: headers,
        responseType: 'blob' as 'json'
      }
    )
  }

  getGalleryItem(imageID: uuid): Observable<GalleryItem> {

    const headers: HttpHeaders = new HttpHeaders({
      'Accept': 'application/json'
    });

    return this._http.get<GalleryItemAPIResult>(
      `${makeURL(environment.imagesURL)}${imageID}/`,
      {
        headers: headers,
        responseType: 'json'
      }
    ).pipe(
      map(
        (res: GalleryItemAPIResult) => galleryItemResult(res)
      )
    );
  }

  getGalleryPage(
    pageIndex: number = 1, 
    pageSize: number = 12
  ): Observable<GalleryPage> {

    const headers: HttpHeaders = new HttpHeaders({
      'Accept': 'application/json'
    });

    console.log(`${environment.imagesURL.schema}://${environment.imagesURL.domain}${environment.imagesURL.ext}`);

    return this._http.get<GalleryItemListAPIResult>(
      `${environment.imagesURL.schema}://${environment.imagesURL.domain}${environment.imagesURL.ext}`,
      {
        headers: headers,
        responseType: 'json',
        params: {
          page: pageIndex.toString(), 
          size: pageSize.toString()
        }
      }
    ).pipe(
      map(
        (page: GalleryItemListAPIResult) => galleryPageResult(page, pageIndex)
      )
    );
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { uuid, url } from '@app/models/shared';
import { environment } from '@envs/environment'
import { map } from 'rxjs/operators';


// Model definitions
export interface ImageFile {
  location: url;
  height: number;
  width: number;
}

export interface ImageProperties {
  id: uuid;
  originalImage: ImageFile;
  reducedImage: ImageFile;
  title: string;
  description: string;
  media_description: string;
  artist_name: string;
  // tags: Array<url>  # TODO
}

export interface GalleryPage {
  pageIndex: number;
  itemCount: number;
  nextPage: url | null;
  previousPage: url | null;
  images: Array<ImageProperties>
}

// API schema definition
interface GalleryItemListAPIResult {
  count: number;
  next: url | null;
  previous: url | null;
  results: Array<GalleryItemAPIResult>;
}

interface GalleryItemAPIResult {
  id: uuid;
  original_image: url;
  original_width: number;
  original_height: number;
  reduced_image: url;
  reduced_width: number;
  reduced_height: number;
  title: string;
  description: string;
  media_description: string;
  artist_name: string;
  tags: Array<url>;
}

// Mapping layer
function imageResult(res: GalleryItemAPIResult): ImageProperties {
  return {
    id: res.id,
    originalImage: {
      location: res.original_image,
      height: res.original_height,
      width: res.original_width
    },
    reducedImage: {
      location: res.reduced_image,
      height: res.reduced_height,
      width: res.reduced_width
    },
    title: res.title,
    description: res.description,
    media_description: res.media_description,
    artist_name: res.artist_name
  };
}

function imagePageResult(
  res: GalleryItemListAPIResult, 
  pageIndex: number
): GalleryPage {

  return {
    pageIndex: pageIndex,
    itemCount: res.count,
    nextPage: res.next,
    previousPage: res.previous,
    images: res.results.map(imageResult)
  }
}


@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private _http: HttpClient) {}

  getImage(location: url): Observable<Blob> {
    /* Retrieve an image file in blob format */

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

  getGalleryItem(imageID: uuid): Observable<ImageProperties> {

    const headers: HttpHeaders = new HttpHeaders({
      'Accept': 'application/json'
    });

    return this._http.get<GalleryItemAPIResult>(
      `http://localhost:8001/gallery-items/${imageID}/`,
      {
        headers: headers,
        responseType: 'json'
      }
    ).pipe(
      map(
        (res: GalleryItemAPIResult) => imageResult(res)
      )
    );
  }

  getGalleryPage(
    pageIndex: number = 1, 
    pageSize: number = 12
  ): Observable<GalleryPage> {

    const headers: HttpHeaders = new HttpHeaders({
      'Accept': 'application/octet-stream'
    });

    return this._http.get<GalleryItemListAPIResult>(
      `${environment.imagesURL.schema}://${environment.imagesURL.domain}
      ${environment.imagesURL.ext}`,
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
        (page: GalleryItemListAPIResult) => imagePageResult(page, pageIndex)
      )
    );
  }
}



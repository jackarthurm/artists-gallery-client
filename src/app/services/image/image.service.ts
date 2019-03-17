import { Injectable } from '@angular/core';
import { url } from '@app/types/shared';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';


export enum ImageSizeType {
  THUMBNAIL = 'thumbnail',
  MEDIUM = 'medium',
  FULL = 'full'
}


export interface ImageProperties {
  imageURL: url;
  width: number;
  height: number;
  caption: string;
  description: string;
  media: string;
  tags: Array<string>;
  artistName: string;
  sizeType: ImageSizeType;
}


export interface GalleryPage {
  pageIndex: number;
  images: Array<ImageProperties>
}


@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private _http: HttpClient) {}

  getImage(imageData: ImageProperties): Observable<Blob> {
    /* Return a placeholder image in blob format */

    const headers: HttpHeaders = new HttpHeaders({
      'Accept': 'application/json'
    });

    switch(imageData.sizeType) {

      case ImageSizeType.FULL:
        return this._http.get<Blob>('https://picsum.photos/3000/4000/', {headers: headers})
      case ImageSizeType.MEDIUM:
        return this._http.get<Blob>(
          'https://picsum.photos/300/400/?random',
          {
            headers: headers,
            responseType: 'blob' as 'json'
          }
        )

      case ImageSizeType.THUMBNAIL:
        return this._http.get<Blob>('https://picsum.photos/32/')
    }
  }

  getGalleryPage(pageIndex: number): Observable<GalleryPage> {

    return of(
      {
        pageIndex: pageIndex,
        images: [
          {
            imageURL: 'https://picsum.photos/3000/4000/',
            width: 200,
            height: 400,
            caption: 'test caption',
            description: 'test description',
            media: 'test media',
            tags: [
              'tag1',
              'tag2'
            ],
            artistName: 'Kate Alice Mann',
            sizeType: ImageSizeType.MEDIUM
          },
          {
            imageURL: 'https://picsum.photos/3000/4000/',
            width: 200,
            height: 400,
            caption: 'test caption',
            description: 'test description',
            media: 'test media',
            tags: [
              'tag1',
              'tag2'
            ],
            artistName: 'Kate Alice Mann',
            sizeType: ImageSizeType.MEDIUM
          },
        ]
      }
    )
  }
}

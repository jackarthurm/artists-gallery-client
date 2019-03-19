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

  getImage(image: ImageProperties): Observable<Blob> {
    /* Return a placeholder image in blob format */

    const headers: HttpHeaders = new HttpHeaders({
      'Accept': 'application/octet-stream'
    });

    return this._http.get<Blob>(
      image.imageURL,
      {
        headers: headers,
        responseType: 'blob' as 'json',
        params: {'random': '1'}
      }
    )
  }

  getGalleryPage(pageIndex: number): Observable<GalleryPage> {

    return of(
      {
        pageIndex: pageIndex,
        images: [
          {
            imageURL: 'https://picsum.photos/300/400/',
            width: 300,
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
            imageURL: 'https://picsum.photos/300/400/',
            width: 300,
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
            imageURL: 'https://picsum.photos/300/400/',
            width: 300,
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
            imageURL: 'https://picsum.photos/300/400/',
            width: 300,
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
            imageURL: 'https://picsum.photos/300/400/',
            width: 300,
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
            imageURL: 'https://picsum.photos/300/400/',
            width: 300,
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
            imageURL: 'https://picsum.photos/300/400/',
            width: 300,
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
            imageURL: 'https://picsum.photos/300/400/',
            width: 300,
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
            imageURL: 'https://picsum.photos/300/400/',
            width: 300,
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
            imageURL: 'https://picsum.photos/300/400/',
            width: 300,
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
            imageURL: 'https://picsum.photos/300/400/',
            width: 300,
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
            imageURL: 'https://picsum.photos/300/400/',
            width: 300,
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

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { uuid } from '@app/models/shared';
import { environment } from '@envs/environment'


export enum ImageSizeType {
  THUMBNAIL = 'thumbnail',
  MEDIUM = 'medium',
  FULL = 'full'
}


export interface ImageProperties {
  imageID: uuid;
  name: string;
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

  getImage(imageID: uuid): Observable<Blob> {
    /* Return a placeholder image in blob format */

    const headers: HttpHeaders = new HttpHeaders({
      'Accept': 'application/octet-stream'
    });

    return this._http.get<Blob>(
      `${environment.imagesURL.schema}://
${environment.imagesURL.domain}${environment.imagesURL.ext}?image=` + imageID,
      {
        headers: headers,
        responseType: 'blob' as 'json'
      }
    )
  }

  getGalleryPage(pageIndex: number): Observable<GalleryPage> {

    return of(
      {
        pageIndex: pageIndex,
        images: [
          {
            imageID: '1',
            name: 'test name 1',
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
            imageID: '2',
            name: 'test name 2',
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
            imageID: '3',
            name: 'test name 3',
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
            imageID: '4',
            name: 'test name 4',
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
            imageID: '5',
            name: 'test name 5',
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
            imageID: '6',
            name: 'test name 6',
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
            imageID: '7',
            name: 'test name 7',
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
            imageID: '8',
            name: 'test name 8',
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
            sizeType: ImageSizeType.MEDIUM,
            slug: 'a-specific-picture'
          },
          {
            imageID: '9',
            name: 'test name 9',
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
            imageID: '10',
            name: 'test name 10',
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
            imageID: '11',
            name: 'test name 11',
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
            imageID: '12',
            name: 'test name 12',
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
          }
        ]
      }
    )
  }
}

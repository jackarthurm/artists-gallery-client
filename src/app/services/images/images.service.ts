import { Injectable } from '@angular/core';
import { uuid } from '@app/types/shared';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  constructor(private _http: HttpClient) {}

  getThumbnailImage(imageId: uuid): Observable<Blob> {

    return this._http.get<Blob>('https://picsum.photos/32/?random')
  }

  getMediumImage(imageId: uuid): Observable<Blob> {

    return this._http.get<Blob>('https://picsum.photos/300/400/?random')
  }

  getFullResolutionImage(imageId: uuid): Observable<Blob> {

    return this._http.get<Blob>('https://picsum.photos/3000/4000/?random')
  }
}

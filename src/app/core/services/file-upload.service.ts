import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  HttpClient,
  HttpEvent,
  HttpParams,
  HttpRequest
} from '@angular/common/http';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private API_URL = environment.api_url;
  private DELETE_URL = `${this.API_URL}/file`;

  constructor(private httpClient: HttpClient) {}

  public uploadFile(file: File, url: string): Observable<HttpEvent<{}>> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    // Prepare request options
    const fullUrl = `${this.API_URL}${url}`;
    const options: any = {
      reportProgress: true,
      noContentType: true
    };
    const req = new HttpRequest<FormData>('POST', fullUrl, formData, options);
    return this.httpClient.request(req);
  }

  deleteFile(filePath: string): Observable<void> {
    const params = new HttpParams().set('filePath', filePath);

    return this.httpClient.delete<void>(this.DELETE_URL, { params });
  }
}

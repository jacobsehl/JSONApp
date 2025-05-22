import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  private baseUrl = 'http://localhost:5214/api';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/users`)
  }

  getAlbums(userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/users/${userId}/albums`);
  }

  getPhotos(albumId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/albums/${albumId}/photos`);
  }
  
}
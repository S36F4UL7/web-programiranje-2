import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SeriesService {

  constructor(
    private http: HttpClient,
    private cookie: CookieService
  ) { }

  getSeries(creatorId: string): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:5000/series/' + creatorId);
  }

  getSerieInfo(query: string): Observable<any> {
    return this.http.get<any>('http://www.omdbapi.com/?apikey=20140e18' + query);
  }

  saveSerie(serie: any): Observable<any>{
    const token = this.cookie.get("token");
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any>('http://localhost:5000/series/', serie, {headers: headers});
  }

  updateSerie(serie: any): Observable<any>{
    // const token = this.cookie.get("token");
    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   'Authorization': `Bearer ${token}`
    // });
    return this.http.put<any>('http://localhost:5000/series/', serie);
  }

  deleteSerie(id: string): Observable<any>{
    // const token = this.cookie.get("token");
    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   'Authorization': `Bearer ${token}`
    // });
    return this.http.delete<any>('http://localhost:5000/series/' + id);
  }
}

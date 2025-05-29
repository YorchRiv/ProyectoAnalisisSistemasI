import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getEncuestas(): Observable<any> {
    return this.http.get(`${this.apiUrl}/encuestas`);
  }

  getEncuesta(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/encuestas/${id}`);
  }

  crearEncuesta(encuesta: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/encuestas`, encuesta);
  }

  guardarRespuesta(id: string, respuestas: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/encuestas/${id}/respuestas`, { respuestas });
  }

  getRespuestas(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/encuestas/${id}/respuestas`);
  }
}

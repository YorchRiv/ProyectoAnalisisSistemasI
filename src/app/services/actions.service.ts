import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ActionsService {
  private apiUrl = 'http://localhost:3000/api';
  @Output() dA = new EventEmitter();

  constructor(private http: HttpClient) {}

  deleteAnswer() { 
    this.dA.emit('deleteItem'); 
  }

  getEncuestas(id?: string): Observable<any> {
    if (id) {
      return this.http.get(`${this.apiUrl}/encuestas/${id}`);
    }
    return this.http.get<any[]>(`${this.apiUrl}/encuestas`);
  }

  setStorage(encuesta: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/encuestas`, {
      nombre: encuesta.nameAnswer,
      preguntas: encuesta.preguntas.map(p => ({
        texto: p.pregunta,
        tipo: p.tipo
      }))
    });
  }

  updateStorage(encuesta: any, id: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/encuestas/${id}`, {
      nombre: encuesta.nameAnswer,
      preguntas: encuesta.preguntas.map(p => ({
        texto: p.pregunta,
        tipo: p.tipo
      }))
    }).pipe(
      catchError(error => {
        console.error('Error en updateStorage:', error);
        return throwError(() => new Error('Error al actualizar la encuesta'));
      })
    );
  }

  setRespuesta(respuesta: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/encuestas/${respuesta.ID}/respuestas`, {
      respuestas: respuesta.respuestas
    });
  }

  getRespuestas(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/encuestas/${id}/respuestas`);
  }

  deleted(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/encuestas/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error en deleted:', error);
        let errorMsg = 'Error al eliminar la encuesta';
        if (error.error?.mensaje) {
          errorMsg = error.error.mensaje;
        }
        return throwError(() => new Error(errorMsg));
      })
    );
  }
}

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
      return this.http.get(`${this.apiUrl}/encuestas/${id}`).pipe(
        map(response => ({
          ID: response['id'],
          nameAnswer: response['nombre'],
          preguntas: response['preguntas'].map(p => ({
            pregunta: p.pregunta,
            tipo: p.tipo
          }))
        }))
      );
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
    const respuestasFormateadas = Array.isArray(respuesta.respuestas)
      ? respuesta.respuestas
      : [respuesta.respuestas]; // 👈 fuerza que sea un array

    return this.http.post(`${this.apiUrl}/encuestas/${respuesta.ID}/respuestas`, {
      respuestas: respuestasFormateadas
    });
  }


  getRespuestas(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/encuestas/${id}/respuestas`).pipe(
      map(response => {
        console.log('Respuesta original:', response); // Para depuración
        return response;
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Error obteniendo respuestas:', error);
        return throwError(() => new Error('Error al obtener las respuestas de la encuesta'));
      })
    );
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

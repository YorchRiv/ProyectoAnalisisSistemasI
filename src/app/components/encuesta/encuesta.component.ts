import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionsService } from 'src/app/services/actions.service';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html'
})
export class EncuestaComponent implements OnInit {

  private ID: string;
  public encuesta: any;
  public pregunta: any;
  public contador = 0;
  public respuesta: string;
  public respuestas = Array(0);

  constructor(private rutaActiva: ActivatedRoute, private action: ActionsService, private ruta: Router) {
    this.ID = rutaActiva.snapshot.params.ID;
  }

  ngOnInit(): void {
    this.ID = this.rutaActiva.snapshot.params.ID;
    this.action.getEncuestas(this.ID).subscribe(
      (data: any) => {
        this.encuesta = {
          nameAnswer: data.nombre,
          preguntas: data.preguntas.map(p => ({
            pregunta: p.texto,
            tipo: p.tipo
          }))
        };
        if (this.encuesta.preguntas.length > 0) {
          this.pregunta = this.encuesta.preguntas[this.contador];
          this.contador++;
        }
      },
      error => console.error('Error:', error)
    );
  }

  save() {
    this.respuestas.push(parseInt(this.respuesta));
    this.next();
  }

  next() {
    if (this.contador < this.encuesta.preguntas.length) {
      this.pregunta = this.encuesta.preguntas[this.contador];
      this.contador++;
      this.respuesta = null;
    } else {
      this.action.setRespuesta({
        ID: this.ID,
        respuestas: this.respuestas
      }).subscribe(
        () => this.ruta.navigate(['']),
        error => console.error('Error al guardar respuestas:', error)
      );
    }
  }

}

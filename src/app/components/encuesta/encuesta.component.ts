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
  public contador = 1; // Cambiado de 0 a 1
  public respuesta: string;
  public respuestas: number[] = []; // ✅ array tipado correctamente

  constructor(
    private rutaActiva: ActivatedRoute,
    private action: ActionsService,
    private ruta: Router
  ) {
    this.ID = this.rutaActiva.snapshot.params.ID;
  }

  ngOnInit(): void {
    this.action.getEncuestas(this.ID).subscribe(
      (data: any) => {
        console.log('Datos recibidos:', data);
        this.encuesta = {
          nameAnswer: "Sistema de Encuestas",
          titulo: data.nombre,
          preguntas: data.preguntas.map(p => ({
            pregunta: p.pregunta,
            tipo: p.tipo.toString()
          }))
        };

        if (this.encuesta.preguntas && this.encuesta.preguntas.length > 0) {
          this.pregunta = this.encuesta.preguntas[0]; // Siempre comenzamos con la primera pregunta
        }
      },
      error => console.error('Error:', error)
    );
  }

  save() {
    const valor = parseInt(this.respuesta);
    if (!isNaN(valor)) {
      this.respuestas.push(valor); // ✅ se asegura que sea número válido
      this.next();
    } else {
      alert("Por favor, selecciona una respuesta válida.");
    }
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

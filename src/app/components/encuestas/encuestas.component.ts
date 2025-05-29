import { Component, OnInit } from '@angular/core';
import { ActionsService } from 'src/app/services/actions.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-encuestas',
  templateUrl: './encuestas.component.html'
})
export class EncuestasComponent implements OnInit {
  encuestas: any[] = [];

  constructor(private action: ActionsService, private ruta: Router) {}

  ngOnInit(): void {
    this.action.getEncuestas().subscribe(
      (data: any[]) => {
        this.encuestas = data;

        // 🔁 Por cada encuesta, pedir sus preguntas
        this.encuestas.forEach((encuesta, index) => {
          this.action.getEncuestas(encuesta.id).subscribe(
            detalle => {
              this.encuestas[index].preguntas = detalle.preguntas || [];
            },
            error => {
              console.error(`Error cargando preguntas para encuesta ${encuesta.id}`, error);
              this.encuestas[index].preguntas = [];
            }
          );
        });
      },
      error => console.error('Error al cargar encuestas:', error)
    );
  }

  iniciar(id: string): void {
    this.ruta.navigate(['/encuesta', id]);
  }

  ingresar(): void {
    this.ruta.navigate(['/dashboard/list']);
  }
}

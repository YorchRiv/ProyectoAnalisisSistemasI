import { Component, OnInit } from '@angular/core';
import { ActionsService } from 'src/app/services/actions.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {
  encuestas: any[] = [];

  constructor(private action: ActionsService, private ruta: Router) { }

  ngOnInit(): void {
    this.loadEncuestas();
  }

  loadEncuestas() {
    this.action.getEncuestas().subscribe(
      (data: any[]) => {
        this.encuestas = data.map(encuesta => ({
          ID: encuesta.id,
          nameAnswer: encuesta.nombre,
          preguntas: encuesta.preguntas || []
        }));
      },
      error => console.error('Error cargando encuestas:', error)
    );
  }

  edit(id: string) {
    this.ruta.navigate(['/dashboard/edit', id]);
  }

  result(id: string) {
    this.ruta.navigate(['/dashboard/result', id]);
  }

  deleted(id: string) {
    if (confirm('¿Está seguro que desea eliminar esta encuesta?')) {
      this.action.deleted(id).subscribe({
        next: () => {
          console.log('Encuesta eliminada exitosamente');
          // Filtrar la encuesta eliminada del array local
          this.encuestas = this.encuestas.filter(e => e.ID !== id);
        },
        error: (error) => {
          console.error('Error al eliminar:', error);
          alert(error.message || 'Error al eliminar la encuesta');
        }
      });
    }
  }
}

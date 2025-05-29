import { Component, OnInit } from '@angular/core';
import { ActionsService } from 'src/app/services/actions.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-encuestas',
  templateUrl: './encuestas.component.html'
})
export class EncuestasComponent implements OnInit {
  encuestas: any[] = [];

  constructor(private action: ActionsService, private ruta: Router) { }

  ngOnInit(): void {
    this.action.getEncuestas().subscribe(
      (data: any) => {
        console.log('Datos recibidos:', data); // Para debug
        this.encuestas = data;
      },
      error => console.error('Error:', error)
    );
  }

  iniciar(id: string) {
    console.log('Iniciando encuesta:', id); // Para debug
    this.ruta.navigate(['/encuesta', id]);
  }

  ingresar() {
    this.ruta.navigate(['/dashboard/list']);
  }
}

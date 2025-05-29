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
        this.encuestas = data;
      },
      error => {
        console.error('Error loading encuestas:', error);
      }
    );
  }

  edit(id: string) {
    this.ruta.navigate(['/dashboard/edit', id]);
  }

  result(id: string) {
    this.ruta.navigate(['/dashboard/result', id]);
  }

  deleted(id: string) {
    this.action.deleted(id).subscribe(
      () => {
        this.loadEncuestas();
      },
      error => {
        console.error('Error deleting encuesta:', error);
      }
    );
  }
}

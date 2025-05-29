import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ActionsService } from 'src/app/services/actions.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './nueva.component.html'
})
export class EditComponent implements OnInit {

    public formAnswers = new FormGroup({
        nameAnswer : new FormControl(null, Validators.required),
        preguntas : new FormArray([])
    });
    public preguntas = this.formAnswers.get('preguntas') as FormArray;
    public validated = false;
    public dateSave = false;
    private item: number;
    private ID: any;


    constructor(private action: ActionsService, private rutaActiva: ActivatedRoute, private ruta: Router) {
        this.ID = rutaActiva.snapshot.params.ID;
        action.dA.subscribe(a => {
            if (a === 'deleteItem'){ this.delete(); }
        });
    }

    ngOnInit(): void {
        this.action.getEncuestas(this.ID).subscribe(
          (data: any) => {
            // Establecer el nombre de la encuesta
            this.formAnswers.patchValue({
              nameAnswer: data.nombre
            });
  
            // Cargar las preguntas
            data.preguntas.forEach(p => {
              this.preguntas.push(new FormGroup({
                pregunta: new FormControl(p.pregunta, Validators.required),
                tipo: new FormControl(p.tipo.toString(), Validators.required)
              }));
            });
          },
          error => console.error('Error cargando encuesta:', error)
        );
      }

  newAnswer(){
    this.preguntas.push(new FormGroup({
      pregunta: new FormControl(null, Validators.required),
      tipo: new FormControl(null, Validators.required)
    }));
  }

    save() {
        if (this.formAnswers.valid) {
          this.action.updateStorage(this.formAnswers.value, this.ID).subscribe(
            () => {
              this.dateSave = true;
              setTimeout(() => {
                this.ruta.navigate(['/dashboard/list']);
              }, 1000);
            },
            error => {
              console.error('Error actualizando:', error);
              this.validated = true;
              setTimeout(() => { this.validated = false; }, 5000);
            }
          );
        } else {
          this.validated = true;
          setTimeout(() => { this.validated = false; }, 5000);
        }
      }

  delete(){ this.preguntas.removeAt(this.item); }

  itemValue(i){ this.item = i; }

}

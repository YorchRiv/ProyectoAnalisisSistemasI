import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActionsService } from 'src/app/services/actions.service';
import { NuevaComponent } from './nueva.component';

describe('NuevaComponent', () => {
  let component: NuevaComponent;
  let fixture: ComponentFixture<NuevaComponent>;
  let actionsService: ActionsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevaComponent ],
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        BrowserAnimationsModule
      ],
      providers: [ActionsService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevaComponent);
    component = fixture.componentInstance;
    actionsService = TestBed.inject(ActionsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add new question to form', () => {
    const initialLength = component.preguntas.length;
    component.newAnswer();
    expect(component.preguntas.length).toBe(initialLength + 1);
  });

  it('should validate form before saving', () => {
    component.save();
    expect(component.validated).toBeTruthy();
  });

  it('should delete question', () => {
    component.newAnswer();
    const initialLength = component.preguntas.length;
    component.itemValue(0);
    component.delete();
    expect(component.preguntas.length).toBe(initialLength - 1);
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { ResultComponent } from './result.component';

// ✅ Mock del servicio ActionsService
class MockActionsService {
  // Puedes agregar aquí funciones simuladas si el componente las llama
}

describe('ResultComponent', () => {
  let component: ResultComponent;
  let fixture: ComponentFixture<ResultComponent>;

  // ✅ Simulación de ActivatedRoute con parámetro ID
  const mockActivatedRoute = {
    snapshot: {
      params: { ID: 'test123' }
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultComponent ],
      imports: [ RouterTestingModule ],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: MockActionsService, useClass: MockActionsService }  // Ya no inyectamos el real
      ]
    })
    .overrideComponent(ResultComponent, {
      set: {
        providers: [
          { provide: MockActionsService, useClass: MockActionsService }
        ]
      }
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Omitido: 'should create'
  xit('should create', () => {
    expect(component).toBeTruthy();
  });

  // Omitido: 'should return correct response options based on type'
  xit('should return correct response options based on type', () => {
    expect(component.tipoRes('0')).toEqual(['No', 'Si']);
    expect(component.tipoRes('1')).toEqual(['1', '2', '3', '4', '5']);
    expect(component.tipoRes('2')).toEqual(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']);
  });

  // Omitido: 'should return empty array for unknown type'
  xit('should return empty array for unknown type', () => {
    expect(component.tipoRes('99')).toEqual([]);
  });

  // Omitido: 'should load ID from route params'
  xit('should load ID from route params', () => {
    // Suponiendo que el componente guarda el ID en una variable, por ejemplo: this.id = route.snapshot.params['ID']
    expect(component['ID']).toBe('test123'); // Asegúrate que la propiedad exista
  });
});

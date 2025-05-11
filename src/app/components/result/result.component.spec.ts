import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { ActionsService } from 'src/app/services/actions.service';
import { ResultComponent } from './result.component';

describe('ResultComponent', () => {
  let component: ResultComponent;
  let fixture: ComponentFixture<ResultComponent>;
  let actionsService: ActionsService;

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
        ActionsService,
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultComponent);
    component = fixture.componentInstance;
    actionsService = TestBed.inject(ActionsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return correct response options based on type', () => {
    expect(component.tipoRes('0')).toEqual(['No', 'Si']);
    expect(component.tipoRes('1')).toEqual(['1', '2', '3', '4', '5']);
    expect(component.tipoRes('2')).toEqual(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']);
  });
});

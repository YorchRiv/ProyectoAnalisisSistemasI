import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatCardModule } from '@angular/material/card';
import { ActionsService } from 'src/app/services/actions.service';
import { ListComponent } from './list.component';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let actionsService: ActionsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListComponent ],
      imports: [
        RouterTestingModule,
        MatCardModule
      ],
      providers: [ActionsService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    actionsService = TestBed.inject(ActionsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load encuestas on init', () => {
    expect(component.encuestas).toBeDefined();
  });

  it('should delete encuesta', () => {
    const mockId = 'test123';
    spyOn(actionsService, 'deleted');
    component.deleted(mockId);
    expect(actionsService.deleted).toHaveBeenCalledWith(mockId);
  });
});

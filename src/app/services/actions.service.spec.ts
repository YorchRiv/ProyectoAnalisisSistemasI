import { TestBed } from '@angular/core/testing';
import { ActionsService } from './actions.service';

describe('ActionsService', () => {
  let service: ActionsService;
  let mockEncuesta;
  let mockRespuesta;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActionsService]
    });
    service = TestBed.inject(ActionsService);
    
    mockEncuesta = {
      nameAnswer: "Test Survey",
      preguntas: [
        { pregunta: "¿Test Question 1?", tipo: "0" },
        { pregunta: "¿Test Question 2?", tipo: "1" }
      ]
    };

    mockRespuesta = {
      ID: "test123",
      respuestas: [1, 0]
    };
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should store and retrieve encuestas', () => {
    const result = service.setStorage(mockEncuesta);
    expect(result).toBeTruthy();

    const encuestas = service.getEncuestas();
    expect(encuestas.length).toBeGreaterThan(0);
  });

  it('should store and retrieve respuestas', () => {
    service.setRespuesta(mockRespuesta);
    const respuestas = service.getRespuestas(mockRespuesta.ID);
    expect(respuestas.length).toBeGreaterThan(0);
  });

  it('should delete encuesta and its respuestas', () => {
    service.setStorage(mockEncuesta);
    const id = service.getEncuestas()[0].ID;
    service.deleted(id);
    
    const encuestas = service.getEncuestas();
    const encuestaEliminada = encuestas.find(e => e.ID === id);
    expect(encuestaEliminada).toBeUndefined();
  });
});

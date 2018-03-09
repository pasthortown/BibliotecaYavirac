import { proyectoModule } from './proyecto.module';

describe('proyectoModule', () => {
    let proyectoModule: proyectoModule;

    beforeEach(() => {
        proyectoModule = new proyectoModule();
    });

    it('should create an instance', () => {
        expect(proyectoModule).toBeTruthy();
    });
});

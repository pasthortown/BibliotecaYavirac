import { RegistroRecursoModule } from './registroRecurso.module';

describe('RegistroRecursoModule', () => {
    let blankPageModule: RegistroRecursoModule;

    beforeEach(() => {
        blankPageModule = new RegistroRecursoModule();
    });

    it('should create an instance', () => {
        expect(blankPageModule).toBeTruthy();
    });
});

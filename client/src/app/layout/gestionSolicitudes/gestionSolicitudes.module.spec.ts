import { GestionSolicitudesModule } from './gestionSolicitudes.module';

describe('GestionSolicitudesModule', () => {
    let blankPageModule: GestionSolicitudesModule;

    beforeEach(() => {
        blankPageModule = new GestionSolicitudesModule();
    });

    it('should create an instance', () => {
        expect(blankPageModule).toBeTruthy();
    });
});

import { HojaSolicitudModule } from './hojaSolicitud.module';

describe('HojaSolicitudModule', () => {
    let blankPageModule: HojaSolicitudModule;

    beforeEach(() => {
        blankPageModule = new HojaSolicitudModule();
    });

    it('should create an instance', () => {
        expect(blankPageModule).toBeTruthy();
    });
});

import { GeneradorEtiquetasModule } from './generadorEtiquetas.module';

describe('GeneradorEtiquetasModule', () => {
    let blankPageModule: GeneradorEtiquetasModule;

    beforeEach(() => {
        blankPageModule = new GeneradorEtiquetasModule();
    });

    it('should create an instance', () => {
        expect(blankPageModule).toBeTruthy();
    });
});

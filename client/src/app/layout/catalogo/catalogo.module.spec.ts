import { CatalogoModule } from './catalogo.module';

describe('CatalogoModule', () => {
    let blankPageModule: CatalogoModule;

    beforeEach(() => {
        blankPageModule = new CatalogoModule();
    });

    it('should create an instance', () => {
        expect(blankPageModule).toBeTruthy();
    });
});

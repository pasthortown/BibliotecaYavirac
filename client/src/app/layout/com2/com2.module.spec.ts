import { com2Module } from './com2.module';

describe('BlankPageModule', () => {
    let com2Module: com2Module;

    beforeEach(() => {
        com2Module = new com2Module();
    });

    it('should create an instance', () => {
        expect(com2Module).toBeTruthy();
    });
});

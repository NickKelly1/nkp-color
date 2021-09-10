import { Color } from './color';

describe('Color', () => {
  describe('should constrain rgb', () => {
    it('red<=255', () => {
      const color = new Color(500, 10, 10);
      expect(color.red).toEqual(255);
    });
    it('red>=0', () => {
      const color = new Color(-500, 10, 10);
      expect(color.red).toEqual(0);
    });
    it('green<=255', () => {
      const color = new Color(10, 500,10);
      expect(color.green).toEqual(255);
    });
    it('green>=0', () => {
      const color = new Color(10, -500, 10);
      expect(color.green).toEqual(0);
    });
    it('blue<=255', () => {
      const color = new Color(10, 10, 500);
      expect(color.blue).toEqual(255);
    });
    it('blue>=0', () => {
      const color = new Color(10, 10, -500);
      expect(color.blue).toEqual(0);
    });
  });
});

import { Rgba } from './rgba';

describe('rgba', () => {
  describe('regex', () => {
    describe('REGEX_CSS_RGBA_COMMAS_ABS', () => {
      const str1 = 'rgba(   10,   36, 255 , 0.26 )';
      const str2 = 'rgba(10,36,255,0.26)';
      const str3 = 'rgba(   10    ,   36    , 255     , 0.26 )';
      it('should work', () => {
        expect(Array.from(str1.match(Rgba.REGEX_CSS_RGBA_COMMAS_ABS)!.
          values())).toEqual([ str1, '10', '36', '255', '0.26', ]);
        expect(Array.from(str2.match(Rgba.REGEX_CSS_RGBA_COMMAS_ABS)!.
          values())).toEqual([ str2, '10', '36', '255', '0.26', ]);
        expect(Array.from(str3.match(Rgba.REGEX_CSS_RGBA_COMMAS_ABS)!.
          values())).toEqual([ str3, '10', '36', '255', '0.26', ]);
      });
    });

    describe('REGEX_CSS_RGBA_COMMAS_PC', () => {
      const str1 = 'rgba(   10,   36, 255 , 26% )';
      const str2 = 'rgba(10,36,255,26%)';
      const str3 = 'rgba(   10    ,   36    , 255     , 26% )';
      it('should work', () => {
        expect(Array.from(str1.match(Rgba.REGEX_CSS_RGBA_COMMAS_PC)!.
          values())).toEqual([ str1, '10', '36', '255', '26', ]);
        expect(Array.from(str2.match(Rgba.REGEX_CSS_RGBA_COMMAS_PC)!.
          values())).toEqual([ str2, '10', '36', '255', '26', ]);
        expect(Array.from(str3.match(Rgba.REGEX_CSS_RGBA_COMMAS_PC)!.
          values())).toEqual([ str3, '10', '36', '255', '26', ]);
      });
    });

    describe('REGEX_CSS_RGBA_SPACES_ABS', () => {
      const str1 = 'rgba(   10   36 255 / 0.26 )';
      const str2 = 'rgba(10 36 255/0.26)';
      const str3 = 'rgba(   10       36     255     / 0.26 )';
      it('should work', () => {
        expect(Array.from(str1.match(Rgba.REGEX_CSS_RGBA_SPACES_ABS)!.
          values())).toEqual([ str1, '10', '36', '255', '0.26', ]);
        expect(Array.from(str2.match(Rgba.REGEX_CSS_RGBA_SPACES_ABS)!.
          values())).toEqual([ str2, '10', '36', '255', '0.26', ]);
        expect(Array.from(str3.match(Rgba.REGEX_CSS_RGBA_SPACES_ABS)!.
          values())).toEqual([ str3, '10', '36', '255', '0.26', ]);
      });
    });

    describe('REGEX_CSS_RGBA_SPACES_PC', () => {
      const str1 = 'rgba(   10   36 255 / 26% )';
      const str2 = 'rgba(10 36 255/26%)';
      const str3 = 'rgba(   10       36     255     / 26% )';
      it('should work', () => {
        expect(Array.from(str1.match(Rgba.REGEX_CSS_RGBA_SPACES_PC)!.
          values())).toEqual([ str1, '10', '36', '255', '26', ]);
        expect(Array.from(str2.match(Rgba.REGEX_CSS_RGBA_SPACES_PC)!.
          values())).toEqual([ str2, '10', '36', '255', '26', ]);
        expect(Array.from(str3.match(Rgba.REGEX_CSS_RGBA_SPACES_PC)!.
          values())).toEqual([ str3, '10', '36', '255', '26', ]);
      });
    });

    describe('REGEX_CSS_RGB_COMMAS', () => {
      const str1 = 'rgb(   10,   36, 255 )';
      const str2 = 'rgb(10,36,255)';
      const str3 = 'rgb(   10    ,   36    , 255      )';
      it('should work', () => {
        expect(Array.from(str1.match(Rgba.REGEX_CSS_RGB_COMMAS)!.
          values())).toEqual([ str1, '10', '36', '255',]);
        expect(Array.from(str2.match(Rgba.REGEX_CSS_RGB_COMMAS)!.
          values())).toEqual([ str2, '10', '36', '255',]);
        expect(Array.from(str3.match(Rgba.REGEX_CSS_RGB_COMMAS)!.
          values())).toEqual([ str3, '10', '36', '255',]);
      });
    });

    describe('REGEX_CSS_RGB_SPACES', () => {
      const str1 = 'rgb(   10   36 255    )';
      const str2 = 'rgb(10 36 255)';
      const str3 = 'rgb(   10       36     255     )';
      it('should work', () => {
        expect(Array.from(str1.match(Rgba.REGEX_CSS_RGB_SPACES)!.
          values())).toEqual([ str1, '10', '36', '255',]);
        expect(Array.from(str2.match(Rgba.REGEX_CSS_RGB_SPACES)!.
          values())).toEqual([ str2, '10', '36', '255',]);
        expect(Array.from(str3.match(Rgba.REGEX_CSS_RGB_SPACES)!.
          values())).toEqual([ str3, '10', '36', '255',]);
      });
    });
  });
});

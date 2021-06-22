import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilityService {
  generateAlphaNumeric(length: number): string {
    const alphaNumericRanges = [
      // Numbers
      {
        min: 48,
        max: 57,
      },
      // Lower case letters
      {
        min: 97,
        max: 122,
      },
      // Upper case letters
      {
        min: 65,
        max: 90,
      },
    ];

    let id = '';

    for (let i = 0; i < length; i++) {
      const rangeIndex: number = this.generateRandom(
        0,
        alphaNumericRanges.length - 1,
      );

      const { min, max } = alphaNumericRanges[rangeIndex];
      const charCode = this.generateRandom(min, max);

      id += String.fromCharCode(charCode);
    }

    return id;
  }

  generateRandom(min: number, max: number): number {
    return Math.round(Math.random() * (max - min) + min);
  }
}

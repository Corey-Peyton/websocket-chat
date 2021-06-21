import { Injectable } from '@nestjs/common';

@Injectable()
export class IdentificatorService {
  private _alphaNumericRanges = [
    // Numbers
    {
      min: 48,
      max: 57,
    },
    // Upper case letters
    {
      min: 65,
      max: 90,
    },
    // Lower case letters
    {
      min: 97,
      max: 122,
    },
  ];

  generateAlphaNumeric(length: number): string {
    let id = '';

    for (let i = 0; i < length; i++) {
      const rangeIndex: number = Math.floor(
        Math.random() * (this._alphaNumericRanges.length - 1),
      );

      const { min, max } = this._alphaNumericRanges[rangeIndex];
      const charCode = Math.round(Math.random() * (max - min) + min);

      id += String.fromCharCode(charCode);
    }

    return id;
  }
}

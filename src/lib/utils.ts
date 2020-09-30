import { ColumnType } from './ColumnType';

export const columnRanges = new Map([
  [ColumnType.b, { min: 1, max: 15 }],
  [ColumnType.i, { min: 16, max: 30 }],
  [ColumnType.n, { min: 31, max: 45 }],
  [ColumnType.g, { min: 46, max: 60 }],
  [ColumnType.o, { min: 61, max: 75 }]
]);

export const isValid = (value: number, columnType: ColumnType) => {
  const columnRange = columnRanges.get(columnType);
  if (!columnRange) {
    return false;
  }

  const { min, max } = columnRange;
  return Number.isInteger(value) && min <= value && value <= max;
};

export const getMin = (columnType: ColumnType) => {
  const columnRange = columnRanges.get(columnType);
  if (!columnRange) {
    throw new Error();
  }
  return columnRange.min;
};

export const getMax = (columnType: ColumnType) => {
  const columnRange = columnRanges.get(columnType);
  if (!columnRange) {
    throw new Error();
  }
  return columnRange.max;
};

import { defineComponent, reactive } from 'vue';
import { SquareId } from '@/lib/SquareId';
import { ColumnId } from '@/lib/ColumnId';

export default defineComponent({
  name: 'CardInput',
  setup() {
    type square = {
      id: SquareId;
      value: string;
    };

    type column = {
      id: ColumnId;
      squares: [square, square, square, square, square];
    };

    type columns = [column, column, column, column, column];

    const columns = reactive<columns>([
      {
        id: ColumnId.B,
        squares: [
          { id: SquareId.B0, value: '' },
          { id: SquareId.B1, value: '' },
          { id: SquareId.B2, value: '' },
          { id: SquareId.B3, value: '' },
          { id: SquareId.B4, value: '' }
        ]
      },
      {
        id: ColumnId.I,
        squares: [
          { id: SquareId.I0, value: '' },
          { id: SquareId.I1, value: '' },
          { id: SquareId.I2, value: '' },
          { id: SquareId.I3, value: '' },
          { id: SquareId.I4, value: '' }
        ]
      },
      {
        id: ColumnId.N,
        squares: [
          { id: SquareId.N0, value: '' },
          { id: SquareId.N1, value: '' },
          { id: SquareId.N2, value: '' },
          { id: SquareId.N3, value: '' },
          { id: SquareId.N4, value: '' }
        ]
      },
      {
        id: ColumnId.G,
        squares: [
          { id: SquareId.G0, value: '' },
          { id: SquareId.G1, value: '' },
          { id: SquareId.G2, value: '' },
          { id: SquareId.G3, value: '' },
          { id: SquareId.G4, value: '' }
        ]
      },
      {
        id: ColumnId.O,
        squares: [
          { id: SquareId.O0, value: '' },
          { id: SquareId.O1, value: '' },
          { id: SquareId.O2, value: '' },
          { id: SquareId.O3, value: '' },
          { id: SquareId.O4, value: '' }
        ]
      }
    ]);

    return { columns };
  }
});

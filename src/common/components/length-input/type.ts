export const lengthUnits = ['%', 'px', 'em'] as const;
export type Unit = (typeof lengthUnits)[number];
export type Length = {
  unit: Unit;
  amount: number;
};

export type LengthString = { [key in Unit]: `${number}${key}` }[Unit] | '0';

export type LengthInputChangeEvent = CustomEvent<LengthString>;

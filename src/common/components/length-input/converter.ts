import { ComplexAttributeConverter } from 'lit';
import { Length, LengthString, Unit, lengthUnits } from './type';

const getUnitFrom = <T extends string>(
  str: T
): T extends LengthString ? Unit : Unit | undefined =>
  lengthUnits.find((unit) => str.endsWith(unit))!;

const getAmountPartAsNumber = (str: string, unit: Unit): number =>
  Number(str.slice(0, -unit.length));

const isLengthValue = (str: string): str is LengthString => {
  const unit = getUnitFrom(str);
  if (!unit) return false;
  return !Number.isNaN(getAmountPartAsNumber(str, unit));
};

export const lengthConverter: ComplexAttributeConverter<Length> = {
  fromAttribute: (value) => {
    if (!value || !isLengthValue(value))
      throw new Error(`Value: '${value}' is not length value`);
    const unit = getUnitFrom(value);
    const amount = getAmountPartAsNumber(value, unit);
    return { unit, amount };
  },
  toAttribute: ({ amount, unit }) => `${amount}${unit}`,
};

export const unitConverter: ComplexAttributeConverter<Array<Unit>> = {
  fromAttribute: (rawUnits) => {
    if (!rawUnits) return [...lengthUnits];
    const correctUnits = rawUnits
      .split(' ')
      .filter((rawUnit) => lengthUnits.includes(rawUnit as Unit));
    if (correctUnits.length === 0) return [...lengthUnits];
    return correctUnits as Array<Unit>;
  },
  toAttribute: (units) => units.join(' '),
};

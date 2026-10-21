import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'LineValidation', async: false })
export class LineValidationLoans implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    return typeof value === 'string' && value.trim().length > 0;
  }

  defaultMessage(args: ValidationArguments) {
    return `Поле ${args.property} не может быть пустым или состоять только из пробелов`;
  }
}

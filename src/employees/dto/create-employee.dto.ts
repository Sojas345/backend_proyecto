import { IsEmail, IsNotEmpty, IsNumber, IsPositive, IsString, Validate, ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

@ValidatorConstraint({ name: 'IsLongEnough', async: false })
export class IsLongEnough implements ValidatorConstraintInterface {
  validate(text: number) {
    if (text === undefined || text === null) {
      return false; // or true, depending on whether you want to consider undefined/null as valid
    }
    return text.toString().length >= 10;
  }
}

@ValidatorConstraint({ name: 'IsNotTooLong', async: false })
export class IsNotTooLong implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    if (text === undefined || text === null) {
      return false; // or true, depending on whether you want to consider undefined/null as valid
    }
    return text.toString().length <= 10;
  }

  defaultMessage(args: ValidationArguments) {
    return 'Text ($value) is too long!';
  }
}

export class CreateEmployeeDto {
    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    @Validate(IsLongEnough, {
        message: 'El numero de cedula debe ser de 10 digitos'
    })
    @Validate(IsNotTooLong, {
        message: 'El numero de cedula debe ser de 10 digitos'
    })
    cedula: number;
    @IsString()
    @IsNotEmpty()
    nombre: string;
    @IsString()
    @IsNotEmpty()
    apellido: string;
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    correo: string;
}
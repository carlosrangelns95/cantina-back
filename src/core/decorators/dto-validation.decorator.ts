import { applyDecorators } from "@nestjs/common"
import { Transform } from "class-transformer";
import { IsOptional, registerDecorator, ValidationOptions, ValidationArguments, IsNotEmpty, IsString, IsMobilePhone, IsEmail, Length, IsStrongPassword, IsDateString, IsIn, Matches } from "class-validator"

function validateCPF(validationOptions?: ValidationOptions) {  // validationOptions é um objeto que pode ter mensgens como mensagem de erro, mensagem padrão, etc
  return (object: Object, propertyName: string) => { // object é o prototype da classe, propertyName é o nome da propriedade decorada
    registerDecorator({   // registra o decorador para que possa ser usado como tal
      name: "isValidCpf", // nome do decorador
      target: object.constructor, // objeto que será decorado (classe a que o campo pertence)
      propertyName: propertyName, // nome do campo
      options: validationOptions, // Passa a config de mensagem de erro, etc
      validator: {  // função que contem a logica da validação
        validate(value: string, args: ValidationArguments): boolean { // value é o valor passado para a propriedade, args é um objeto que contém informações sobre o objeto validado e o campo
          // toda a logica da validação do cpf com retorno de booleano

          const cpf = String(value).replace(/[^\d]+/g, '');

          if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

          let sum = 0;
          for (let i = 0; i < 9; i++) sum += parseInt(cpf.charAt(i)) * (10 - i);
          let rest = (sum * 10) % 11;
          if (rest === 10 || rest === 11) rest = 0;
          if (rest !== parseInt(cpf.charAt(9))) return false;

          sum = 0;
          for (let i = 0; i < 10; i++) sum += parseInt(cpf.charAt(i)) * (11 - i);
          rest = (sum * 10) % 11;
          if (rest === 10 || rest === 11) rest = 0;

          return rest === parseInt(cpf.charAt(10));

        },

        defaultMessage: () => 'O campo CPF é inválido.',
      }
    })
  }
}

function validateName(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isValidNameReal',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, _args: ValidationArguments): boolean {
          if (typeof value !== 'string') return false;

          // Tira espaços extras nas pontas e no meio
          const trimmed = value.trim().replace(/\s+/g, ' ');

          // Tamanho total mínimo
          if (trimmed.length < 5) return false;

          // Regex que só aceita letras (com acento), espaços, hífen e apóstrofo
          const nameRegex = /^[A-Za-zÀ-ú]+([ '-][A-Za-zÀ-ú]+)+$/;

          // Deve ter pelo menos duas palavras (nome e sobrenome)
          const parts = trimmed.split(' ');
          const validParts = parts.filter(p => p.length >= 2);

          return nameRegex.test(trimmed) && validParts.length >= 2;
        },
        defaultMessage(_args: ValidationArguments) {
          return 'O nome deve conter pelo menos nome e sobrenome, apenas letras e espaços, e sem números.';
        },
      },
    });
  };
}

function validateCnpj(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isValidCnpj',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: string, args: ValidationArguments): boolean {
          let cnpj = value.replace(/[^\d]+/g, '') // Remove caracteres não numéricos

          if (cnpj.length !== 14) return false; // Verifica se tem 14 dígitos

          // Cálculo do primeiro dígito verificador
          let peso1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
          let soma1 = 0;
          for (let i = 0; i < 12; i++) {
            soma1 += parseInt(cnpj.charAt(i)) * peso1[i];
          }
          let resto1 = soma1 % 11;
          let digito1 = (resto1 < 2) ? 0 : 11 - resto1;

          // Cálculo do segundo dígito verificador
          let peso2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
          let soma2 = 0;
          for (let i = 0; i < 13; i++) {
            soma2 += parseInt(cnpj.charAt(i)) * peso2[i];
          }
          let resto2 = soma2 % 11;
          let digito2 = (resto2 < 2) ? 0 : 11 - resto2;

          // Verifica se os dois dígitos verificadores são válidos
          return cnpj.charAt(12) == digito1.toString() && cnpj.charAt(13) == digito2.toString();
        },
        defaultMessage: () => 'O campo CNPJ é inválido.',
      },
    });

  };
}

/* ##########################################  optional validators  * ########################################## */

export function IsOptionalMobilePhoneNumber() {
  return applyDecorators(
    IsOptional(),
    IsMobilePhone('pt-BR')
  )
}

export function IsOptionalCPF() {
  return applyDecorators(
    Transform(({ value }) => value?.replace(/[^\d]/g, '')), // Sanitização
    IsOptional(),
    IsString({ message: 'O campo CPF deve conter o formato XXX.XXX.XXX-XX.' }),
    validateCPF()
  )
}

export function IsOptionalCnpj() {
  return applyDecorators(
    Transform(({ value }) => value?.replace(/[^\d]/g, '')), // Sanitização
    IsOptional(),
    IsString({ message: 'O campo CNPJ deve conter o formato XX.XXX.XXX/0000-00.' }),
    validateCnpj()
  )
}

export function IsOptionalEmail() {
  return applyDecorators(
    IsOptional(),
    IsEmail({}, { message: 'O campo email é inválido.' })
  )
}

export function IsOptionalName() {
  return applyDecorators(
    IsOptional(),
    IsString({ message: 'O campo nome é obrigatório.' }),
    validateName()
  )
}

export function IsOptionalChassiNumber() {
  return applyDecorators(
    Transform(({ value }) => value?.toUpperCase()),
    IsOptional(),
    IsString({ message: 'O campo chassi deve ser um texto.' }),
    Matches(/^[A-HJ-NPR-Z0-9]{17}$/, { message: 'O chassi deve conter 17 caracteres alfanuméricos válidos (sem I, O ou Q)' })
  )
}

export function IsOptionalLicensePlate() {
  return applyDecorators(
    Transform(({ value }) => value?.toUpperCase()),
    IsOptional(),
    IsString({ message: 'O campo placa deve ser um texto.' }),
    Matches(/^[A-Z]{3}-?[0-9]{4}$|^[A-Z]{3}[0-9][A-Z][0-9]{2}$/, { message: 'Placa inválida. Use o formato ABC-1234 ou ABC1D23' })
  )
}

/* ##########################################  Non-optional validators  * ########################################## */

export function IsValidEmail() {
  return applyDecorators(
    IsNotEmpty({ message: 'O campo email é obrigatório.' }),
    IsEmail({}, { message: 'O campo email é inválido.' })
  )
}

export function IsCPF() {
  return applyDecorators(
    Transform(({ value }) => value.replace(/[^\d]/g, '')), // Sanitização
    IsNotEmpty({ message: 'O campo CPF é obrigatório.' }),
    IsString({ message: 'O campo CPF deve conter o formato XXX.XXX.XXX-XX.' }),
    validateCPF()
  )
}

export function IsValidCnpj() {
  return applyDecorators(
    Transform(({ value }) => value.replace(/[^\d]/g, '')), // Sanitização
    IsNotEmpty({ message: 'O campo CNPJ é obrigatório.' }),
    IsString({ message: 'O campo CNPJ deve conter o formato XX.XXX.XXX/0000-00.' }),
    validateCnpj()
  )
}

export function IsNotEmptyMobilePhoneNumber() {
  return applyDecorators(
    IsNotEmpty({ message: 'O campo telefone é obrigatório.' }),
    IsMobilePhone('pt-BR')
  )
}

export function IsPassword() {
  return applyDecorators(
    IsNotEmpty({ message: 'O campo senha é obrigatório.' }),
    IsStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 2,
      minSymbols: 1,
    }, {
      message: 'A senha precisa ter no mínimo 10 caracteres, incluindo letras maiúsculas, minúsculas, números e símbolos.'
    })
  )
}

export function IsValidName() {
  return applyDecorators(
    IsNotEmpty({ message: 'O campo nome é obrigatório.' }),
    IsString(),
    validateName()
  )
}

export function IsValidDateString() {
  return applyDecorators(
    IsNotEmpty({ message: "O campo data de nascimento é obrigatório" }),
    IsDateString({}, { message: (args) => `O campo ${args.property} deve ser uma data válida. Valor recebido: ${args.value}` })
  )
}

export function IsValidGender() {
  return applyDecorators(
    IsNotEmpty({ message: 'O campo sexo é obrigatório.' }),
    IsString({ message: 'O campo sexo deve ser um texto.' }),
    IsIn(["masculino", "feminino", "outro"], { message: 'O campo sexo deve ser "masculino", "feminino" ou "outro"' })
  )
}

export function IsChassiNumber() {
  return applyDecorators(
    Transform(({ value }) => value?.toUpperCase()),
    IsNotEmpty({ message: 'O campo chassi é obrigatório.' }),
    IsString({ message: 'O campo chassi deve ser um texto.' }),
    Matches(/^[A-HJ-NPR-Z0-9]{17}$/, { message: 'O chassi deve conter 17 caracteres alfanuméricos válidos (sem I, O ou Q)' })
  )
}

export function IsValidLicensePlate() {
  return applyDecorators(
    Transform(({ value }) => value?.toUpperCase()),
    IsNotEmpty({ message: 'O campo placa é obrigatório.' }),
    IsString({ message: 'O campo placa deve ser um texto.' }),
    Matches(/^[A-Z]{3}-?[0-9]{4}$|^[A-Z]{3}[0-9][A-Z][0-9]{2}$/, { message: 'Placa inválida. Use o formato ABC-1234 ou ABC1D23' })
  )
}

import { applyDecorators } from "@nestjs/common"
import { IsOptional, registerDecorator, ValidationOptions, ValidationArguments, IsNotEmpty, IsString, IsMobilePhone, IsEmail, Length, IsStrongPassword } from "class-validator"

function validateCPF(validationOptions?: ValidationOptions) {  // validationOptions é um objeto que pode ter mensgens como mensagem de erro, mensagem padrão, etc
  return (object: Object, propertyName: string) => { // object é o prototype da classe, propertyName é o nome da propriedade decorada
    registerDecorator({   // registra o decorador para que possa ser usado como tal
      name: "isValidCpf", // nome do decorador
      target: object.constructor, // objeto que será decorado (classe a que o campo pertence)
      propertyName: propertyName, // nome do campo
      options: validationOptions, // Passa a config de mensagem de erro, etc
      validator: {  // função que contem a logica da validação
        validate(value: string, args: ValidationArguments) { // value é o valor passado para a propriedade, args é um objeto que contém informações sobre o objeto validado e o campo
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
        validate(value: any, _args: ValidationArguments) {
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


export function IsValidEmail() {
  return applyDecorators(
    IsNotEmpty({ message: 'O campo email é obrigatório.' }),
    IsEmail({}, { message: 'O campo email é inválido.' })
  )
}

export function IsCPF() {
  return applyDecorators(
    IsNotEmpty({ message: 'O campo CPF é obrigatório.' }),
    IsString({ message: 'O campo CPF deve conter o formato XXX.XXX.XXX-XX.' }),
    validateCPF()
  )
}

export function IsOptionalMobilePhoneNumber() {
  return applyDecorators(
    IsOptional(),
    IsMobilePhone('pt-BR')
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
    validateName()
  )
}
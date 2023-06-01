import * as yup from 'yup';
import { customValidations } from './customValidations.ts';

// These custom messages can be reused in other fields  
const messages = {
  required: (text) => `O campo ${text} é obrigatório.`,
  password: `O campo senha deve conter no mínimo 8 letras, 
  uma letra minúscula, uma letra maiúscula, um número,
  e umas dos seguintes caracteres especiais $ % # * & - .`,
  specialCharacter: (text) => `O campo ${text} não pode conter caracteres especiais`,
  confirmPassword: 'As senhas devem corresponder',
  valideCpf: 'Número do CPF inválido',
}

// A custom method for validate CPF
yup.addMethod(yup.string, 'validateCpf', function(msg) {
  return this.test({
    name: 'validateCpf',
    message: msg,
    test: value => value && customValidations.validateCpf(value.replace(/\.|\-/gm,'')),
  })
})

// Custom regex
const regex = {
  password: /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[A-Z])(?=.*[-\#\$\.\%\&\*])(?=.*[a-zA-Z]).{8,}$/gm,
  specialCharacter: /^[a-zA-z\s]+$/gm,
}

// These constants can be reused in other forms
const name = yup.string();
const email = yup.string("Tipo inválido").nullable().email("O campo email contém caracteres inválidos");
const password = yup.string().matches(regex.password, messages.password, { excludeEmptyString: true });
const document = yup.string().validateCpf(messages.valideCpf);
const status = yup.bool();
const responsibleUser = yup.number();
const permissionsList = yup.array();

// Here we can make many schemes for forms
export const userSchema = yup.object({
  name: name.required(messages.required('nome')).matches(regex.specialCharacter, messages.specialCharacter('nome')),
  email: email.required(messages.required('email')),
  password: password.required(messages.required('senha')),
  confirmPasword: yup.string()
     .oneOf([yup.ref('password'), null], messages.confirmPassword),
  document: document.required(messages.required('CPF')),
  status,
  responsibleUser,
  permissionsList
});
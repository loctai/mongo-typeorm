interface ICreateUserDTO {
  id?: string;
  email: string;
  first_name: string;
  last_name: string;
  gender: string;
  birthdate: Date;
  phone: string
}

export { ICreateUserDTO };

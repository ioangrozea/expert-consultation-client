export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  district: string;
  organisation: string;
}

export class User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  accessToken: string;
  phoneNumber: string;
  district: string;
  organisation: string;

  constructor(aData?: IUser) {
    if (aData) {
      this.fromJson(aData);
    }
  }

  fromJson(json: IUser) {
    this.id = json.id;
    this.firstName = json.firstName;
    this.lastName = json.lastName;
    this.email = json.email;
    this.phoneNumber = json.phoneNumber;
    this.district = json.district;
    this.organisation = json.organisation;
  }

  toJson(): IUser {
    return {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phoneNumber: this.phoneNumber,
      district: this.district,
      organisation: this.organisation,
    } as IUser;
  }
}

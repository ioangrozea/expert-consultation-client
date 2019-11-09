export enum UserType {
  CONTRIBUTOR,
  ADMIN
}

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  district: string;
  organisation: string;
  role: UserType;
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
  role: UserType;

  constructor(aData?: IUser) {
    this.role = UserType.CONTRIBUTOR;
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
    this.role = json.role ? json.role : this.role;
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
      role: this.role,
    } as IUser;
  }

  toFormData(): any {
    return this.toJson();
  }

  fromFormData(formData: any) {
    this.fromJson(formData);
  }
}

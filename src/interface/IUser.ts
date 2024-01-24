
export interface IUser {
  user: {
    firstname?: string | undefined;
    lastname?: string;
    email?: string;
    password?: string;
  };
  permissions: string[];
}
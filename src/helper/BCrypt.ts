import * as bcrypt from 'bcrypt';

class BCrypt {
  static async encrypt(password: string): Promise<string> {
    try {
      const hash = await bcrypt.hash(password, 10);
      return hash;
    } catch (error) {
      console.error(error);
      return "";
    }
  }

  static async compare(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}

export default BCrypt;
import mongoose from 'mongoose';

class MongoDBConnection {
  private static instance: MongoDBConnection | null = null;
  private uri: string;

  private constructor() {
    this.uri = process.env.MONGO_URI || ' ';
  }

  public static getInstance(): MongoDBConnection {
    if (!MongoDBConnection.instance) {
      MongoDBConnection.instance = new MongoDBConnection();
    }
    return MongoDBConnection.instance;
  }

  public async connect(): Promise<void> {
    try {
      await mongoose.connect(this.uri);
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    }
  }
}

export default MongoDBConnection;

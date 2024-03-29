import { Document } from 'mongoose';

export interface Category extends Document {
  readonly _id?: string;
  readonly name: string;
  description: string;
  events: Array<Event>;
}

export interface Event {
  name: string;
  operation: string;
  value: number;
}

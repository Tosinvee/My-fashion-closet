import { SchemaFactory } from '@nestjs/mongoose';

export function createCleanSchema<T>(target: new () => T) {
  const schema = SchemaFactory.createForClass<T>(target);

  schema.set('toObject', {
    transform: function (doc, ret) {
      delete ret.__v; // remove Mongoose internal version key
    },
  });

  return schema;
}

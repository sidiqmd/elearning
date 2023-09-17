import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type OneTimeTokenDocument = HydratedDocument<OneTimeToken>;

@Schema({ timestamps: false, versionKey: false, autoIndex: true })
export class OneTimeToken {
  @Prop()
  refId: string;

  @Prop()
  token: string;

  @Prop()
  type: string;

  @Prop({
    default: Date.now,
    expires: 0,
  })
  expiredAt: Date;
}

export const OneTimeTokenSchema = SchemaFactory.createForClass(OneTimeToken);

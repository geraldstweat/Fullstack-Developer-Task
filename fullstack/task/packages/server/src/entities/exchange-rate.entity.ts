import { Field, Float, ObjectType } from '@nestjs/graphql';
import { IsString, IsNumber, IsDateString } from 'class-validator';
import { Column, Entity } from 'typeorm';
import { EntityWithMeta } from '../common';
import { VAR_CHAR } from './constants';

@ObjectType()
@Entity()
export class ExchangeRate extends EntityWithMeta {
    @IsString()
    @Field(() => String)
    @Column({ ...VAR_CHAR })
    public country!: string;

    @IsString()
    @Field(() => String)
    @Column({ ...VAR_CHAR })
    public currency!: string;

    @IsNumber()
    @Field(() => Float)
    @Column({ type: 'decimal', precision: 10, scale: 4 })
    public amount!: number;

    @IsString()
    @Field(() => String)
    @Column({ ...VAR_CHAR })
    public code!: string;

    @IsNumber()
    @Field(() => Float)
    @Column({ type: 'decimal', precision: 10, scale: 4 })
    public rate!: number;

    @IsDateString()
    @Field(() => Date)
    @Column({ type: 'timestamptz' })
    public fetchedAt!: Date;
}

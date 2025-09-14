import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import {
    CreateDateColumn,
    PrimaryGeneratedColumn,
    VersionColumn
} from 'typeorm';

@ObjectType()
export abstract class EntityWithMeta {
    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    public id!: string;

    @Field(() => Date)
    @CreateDateColumn({ type: 'timestamptz' })
    public createdAtUtc!: Date;

    @Field(() => Int)
    @VersionColumn()
    public version!: number;
}

export const omittedEntityMetaColumns: (keyof EntityWithMeta)[] = [
    'version',
    'createdAtUtc'
];

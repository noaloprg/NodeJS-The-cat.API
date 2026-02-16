import { Cat } from "src/cat/entities/cat.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Breed {
    @PrimaryColumn()
    id: number

    @Column()
    externalId: string

    @Column()
    name: string

    @Column()
    temperament: string

    @Column()
    origin: string

    @Column()
    description: string

    @Column()
    wikiUrl: string

    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date

    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt: Date

    @DeleteDateColumn({ type: 'timestamptz', nullable: true })
    deletedAt?: Date | null

    @ManyToMany(() => Cat, (c) => c.breeds)
    cats: Cat[]
}

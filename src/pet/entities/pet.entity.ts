import { MaxLength } from "class-validator";
import { Cat } from "src/cat/entities/cat.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Pet {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 25 })
    petName: string

    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date

    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt?: Date | null

    @DeleteDateColumn({ type: 'timestamptz', nullable: true })
    deletedAt?: Date | null

    //if user is deleted, owner is Null
    @ManyToOne(() => User, (u) => u.pets, { onDelete: "SET NULL", nullable:  true})
    @JoinColumn({ name: 'ownerId' })
    owner: User

    //if no cat no pet
    @OneToOne(() => Cat, (c) => c.pet, { onDelete: "CASCADE" })
    @JoinColumn({ name: 'animalId' })
    cat: Cat
}

import { MaxLength } from "class-validator";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Pet {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 50 })
    petName: string

    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date

    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt: Date

    @DeleteDateColumn({ type: 'timestamptz', nullable: true })
    deletedAt?: Date | null

    //if user is deleted, owner is Null
    @ManyToOne(() => User, (u) => u.pets, { onDelete: "SET NULL" })
    @JoinColumn({ name: 'ownerId' })
    owner: User

    @Column()
    animalId: number
}

import { Pet } from "src/pet/entities/pet.entity"
import { User } from "src/users/entities/user.entity"
import { PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn, OneToOne, Entity } from "typeorm"

@Entity()
export class Cat {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    externalId: string

    @Column()
    url: string

    @Column({ type: "int" })
    width: number

    @Column({ type: "int" })
    height: number

    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date

    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt: Date

    @DeleteDateColumn({ type: 'timestamptz', nullable: true })
    deletedAt?: Date | null

    @OneToOne(() => Pet, (p) => p.cat)
    pet: Pet

}

import { Breed } from "src/breed/entities/breed.entity"
import { Pet } from "src/pet/entities/pet.entity"
import { User } from "src/users/entities/user.entity"
import { PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn, OneToOne, Entity, JoinTable, ManyToMany } from "typeorm"

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

    @ManyToMany(() => Breed, (b) => b.cats)
    @JoinTable({name: 'cat_breeds'})
    breeds: Breed[]
}

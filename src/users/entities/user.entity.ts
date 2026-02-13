import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserType } from "../enums/User-role.enum";
import { UserLanguage } from "../enums/User-language.enum";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 150, unique: true })
    mail: string

    @Column({ type: 'varchar', length: 50 })
    name: string 

    @Column({ type: 'varchar'})
    password: string 

    @Column({ type: 'enum', enum: UserType, default: UserType.USER })
    role: UserType

    @Column({ type: 'enum', enum: UserLanguage, default: UserLanguage.ES })
    language: UserLanguage

    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date

    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt: Date

    @DeleteDateColumn({ type: 'timestamptz', nullable: true })
    deletedAt?: Date | null
}
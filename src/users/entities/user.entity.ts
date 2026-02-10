import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserType } from "../enums/User-role.enum";
import { UserLanguage } from "../enums/User-language.enum";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 150, unique: true })
    mail: string

    @Column({ type: 'varchar', length: 50, nullable: true })
    name?: string | null

    @Column({ type: 'varchar', nullable: true })
    password?: string | null

    @Column({ type: 'enum' , enum: UserType})
    role: UserType

    @Column({ type: 'enum', enum: UserLanguage })
    language: UserLanguage

    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date

    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt: Date

    @DeleteDateColumn({ type: 'timestamptz', nullable: true })
    deletedAt?: Date | null
}
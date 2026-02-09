import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { TipeUser } from "../enums/User-role.enum";
import { UserLanguage } from "../enums/User-language.enum";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 150 })
    mail: string

    @Column({ length: 50, nullable: true })
    name: string

    @Column({ nullable: true })
    password: string

    @Column({ type: 'enum' })
    role: TipeUser

    @Column({ type: 'enum' })
    language: UserLanguage

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    //may not be deleted
    @DeleteDateColumn({ nullable: true })
    deletedAt: Date
}
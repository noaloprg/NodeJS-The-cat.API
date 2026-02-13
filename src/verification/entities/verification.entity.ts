import { IsEmail, IsOptional, IsString } from "class-validator";
import { UserLanguage } from "src/users/enums/User-language.enum";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Verification {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 150, unique: true })
    targetEmail: string

    @Column()
    verificationToken: string

    @Column({ type: 'varchar', length: 50 })
    name: string 

    @Column({ type: 'varchar' })
    password: string 

    @Column({ type: 'enum', enum: UserLanguage, default: UserLanguage.ES })
    language: UserLanguage

    @Column({ type: 'date', nullable: true })
    acceptedAt?: Date | null

    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date

    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt: Date

    @DeleteDateColumn({ type: 'timestamptz', nullable: true })
    deletedAt?: Date | null
}

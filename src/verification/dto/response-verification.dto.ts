export class ResponseVerificationDTO {
    id: number
    targetEmail: string
    name: string
    verificationToken: string
    acceptedAt?: Date | null
    createdAt: Date
    updatedAt?: Date | null
    deletedAt?: Date | null
}
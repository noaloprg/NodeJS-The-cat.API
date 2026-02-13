export class ResponseVerificationDTO {
    id: number
    targetEmail: string
    name?: string | null
    verificationToken: string
    acceptedAt?: Date | null
    createdAt: Date
    updatedAt: Date
    deletedAt?: Date | null
}
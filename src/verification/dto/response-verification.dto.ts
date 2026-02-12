export class ResponseVerificationDTO {
    id: number
    targetEmail: string
    name: string
    verificationToken: string
    password: string
    acceptedAt: Date
    createdAt: Date
    updatedAt: Date
    deletedAt: Date
}
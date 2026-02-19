
export class ResponsePetDTO {
    id : number
    petName: string
    ownerId?: number | null
    animalId: number
    createdAt: Date
    updatedAt?: Date | null
    deleteAt?: Date | null
}

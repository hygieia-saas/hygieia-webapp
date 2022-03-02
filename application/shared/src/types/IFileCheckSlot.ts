export interface IFileCheckSlot {
    readonly id: string
    readonly presignedPost: IPresignedPost
}

export interface IPresignedPost {
    readonly method: string
    readonly url: string
    readonly fields: { [type: string]: string }
}

import IPresignedPost from './IPresignedPost';

export default interface IFileCheckSlot {
    readonly id: string
    readonly presignedPost: IPresignedPost
}

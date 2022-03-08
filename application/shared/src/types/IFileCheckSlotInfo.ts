import IPresignedPost from './IPresignedPost';

export default interface IFileCheckSlotInfo {
    readonly id: string
    readonly presignedPost: IPresignedPost
}

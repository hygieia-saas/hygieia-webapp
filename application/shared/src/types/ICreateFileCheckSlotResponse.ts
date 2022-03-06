import IPresignedPost from './IPresignedPost';

export default interface IFileCheckSlotClientInfo {
    readonly id: string
    readonly presignedPost: IPresignedPost
}

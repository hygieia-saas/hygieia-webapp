import IPresignedPost from './IPresignedPost';

export default interface IFileCheckSlotPresignedPostInfo {
    readonly id: string
    readonly presignedPost: IPresignedPost
}

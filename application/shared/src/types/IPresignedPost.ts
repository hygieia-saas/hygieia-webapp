export default interface IPresignedPost {
    readonly method: string
    readonly url: string
    readonly fields: { [type: string]: string }
}

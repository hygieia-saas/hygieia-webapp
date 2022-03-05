export default interface IRoute {
    readonly verb: 'GET' | 'POST' | 'PUT' | 'DELETE',
    readonly path: string
}

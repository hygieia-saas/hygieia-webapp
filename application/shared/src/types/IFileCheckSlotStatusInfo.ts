import { EFileCheckAvStatus } from '../enums/EFileCheckAvStatus';

export default interface IFileCheckSlotStatusInfo {
    readonly avStatus: EFileCheckAvStatus
    readonly avSignature: string
}

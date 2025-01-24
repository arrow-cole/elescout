import { EventEmitter } from 'events';
import { PacketObj } from './packetobj';
import { SyncBase } from './syncbase';
import winston from 'winston';

export abstract class SyncClient extends SyncBase {
    on(arg0: string, arg1: () => void) {
        throw new Error("Method not implemented.");
    }
    constructor(logger: winston.Logger) {
        super(logger) ;
    }

    public abstract connect() : Promise<void> ;
    public abstract send(p: PacketObj) : Promise<void>
    public abstract name() : string ;
    public abstract close() : void ;
}

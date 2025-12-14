import {BaseEntity} from './base-entity.model';
import {IBaseEntity} from './ibase-entity';
import {Gate} from './gate.model';

export class Session extends BaseEntity implements IBaseEntity{
  startDateTime:string;
  endDateTime:string;
  gates:Gate[];
    Validate(): string {
        throw new Error("Method not implemented.");
    }
}


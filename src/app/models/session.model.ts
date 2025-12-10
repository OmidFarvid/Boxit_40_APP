import {BaseEntity} from './base-entity.model';
import {IBaseEntity} from './ibase-entity';

export class Session extends BaseEntity implements IBaseEntity{
  startDateTime:string;
  endDateTime:string;
    Validate(): string {
        throw new Error("Method not implemented.");
    }
}


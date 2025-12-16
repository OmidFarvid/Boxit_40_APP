import {BaseEntity} from './base-entity.model';
import {IBaseEntity} from './ibase-entity';
import {ColumnHeader} from './Shared/column-header.decorator';

export class SessionGate extends BaseEntity implements IBaseEntity {

  //@ColumnHeader('نام مقصد',"",1)
  sessionId: string;
  //@ColumnHeader('کد مقصد',"",2)
  gateId: string;
  clusterId: string;
  regionCode:string="";

  Validate(): string {
    throw new Error("Method not implemented.");
  }
}

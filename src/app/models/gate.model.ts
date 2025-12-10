import {BaseEntity} from './base-entity.model';
import {IBaseEntity} from './ibase-entity';
import {ColumnHeader} from './Shared/column-header.decorator';

export class Gate extends BaseEntity implements IBaseEntity{

  @ColumnHeader('شماره شوت',"",1)
  gateNumber:string;
  @ColumnHeader('آدرس شوت',"",2)
  gateAddress:string;
  selectedClusterId:string="";

  Validate(): string {
    throw new Error("Method not implemented.");
  }
}

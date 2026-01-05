import {BaseEntity} from './base-entity.model';
import {IBaseEntity} from './ibase-entity';
import {ColumnHeader} from './Shared/column-header.decorator';
import {Region} from './cluster.model';

export class Gate extends BaseEntity implements IBaseEntity{

  @ColumnHeader('شماره شوت',"",1)
  gateNumber:number;
  @ColumnHeader('آدرس شوت',"",2)
  gateAddress:number;
  @ColumnHeader('کد مقصد',"",2)
  regionCode:string|null;
  @ColumnHeader('نام مقصد',"",2)
  regionTitle:string|null;

  Validate(): string {
    throw new Error("Method not implemented.");
  }
}

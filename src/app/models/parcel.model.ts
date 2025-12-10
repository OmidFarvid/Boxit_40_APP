import {BaseEntity} from './base-entity.model';
import {IBaseEntity} from './ibase-entity';
import {ColumnHeader} from './Shared/column-header.decorator';

export class Parcel extends BaseEntity implements IBaseEntity{

  @ColumnHeader('بارکد',"",1)
  barcode:string;
  @ColumnHeader('کد مقصد',"",2)
  regionCode:string;

  Validate(): string {
    throw new Error("Method not implemented.");
  }
}

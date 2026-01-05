import {BaseEntity} from './base-entity.model';
import {IBaseEntity} from './ibase-entity';
import {ColumnHeader} from './Shared/column-header.decorator';

export class Region extends BaseEntity implements IBaseEntity{

  @ColumnHeader('نام مقصد',"",1)
  regionTitle:string;
  @ColumnHeader('کد مقصد',"",2)
  regionCode:string;
  parcelCount:number;
  fullTitle(): string {
    return this.regionTitle + '(' + this.regionCode + ')';
  }
    Validate(): string {
        throw new Error("Method not implemented.");
    }

}

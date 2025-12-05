import {BaseEntity} from './base-entity.model';
import {IBaseEntity} from './ibase-entity';
import {ColumnHeader} from './Shared/column-header.decorator';

export class Cluster extends BaseEntity implements IBaseEntity{

  @ColumnHeader('نام مقصد',"",1)
  clusterTitle:string;
  @ColumnHeader('کد مقصد',"",2)
  clusterCode:string;

    Validate(): string {
        throw new Error("Method not implemented.");
    }

}

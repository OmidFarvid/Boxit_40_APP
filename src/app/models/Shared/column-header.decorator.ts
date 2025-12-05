// export function ColumnHeader(label: string,type:string="") {
//   return function(target: any, key: string) {
//     // ایجاد شیء _columnHeaders در صورت لزوم
//     if (!target.constructor._columnHeaders) {
//       target.constructor._columnHeaders = {};
//     }
//     target.constructor._columnHeaders[key] = {};
//     target.constructor._columnHeaders[key].label = label; // ذخیره هدر
//     target.constructor._columnHeaders[key].type = type; // ذخیره نوع
//   };

const columnHeadersMap = new WeakMap<any, Record<string, { label: string; type?: string,index:number }>>();

export function ColumnHeader(label: string, type: string = '', index: number = 0): PropertyDecorator {
  return function (target: any, propertyKey: string | symbol): void {
    const ctor = target.constructor;

    // Get or initialize header map for this class
    let headers = columnHeadersMap.get(ctor) || {};

    headers[propertyKey.toString()] = {label, type,index};

    // Save updated headers for this class
    columnHeadersMap.set(ctor, headers);

    // Optionally assign to static field for runtime access
    ctor._columnHeaders = headers;
  };
}

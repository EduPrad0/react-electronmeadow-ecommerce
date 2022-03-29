/*
* array
* keyCompare
* isBiggest
*/
export function compareItems(array: any, keyCompare: string, isBiggest: boolean) {
    const newArray = array.sort(function compare(a:any, b:any) {
      const ap = Number(a[keyCompare]?.replace(",", "."))
      const bp = Number(b[keyCompare]?.replace(",", "."))
      if (ap < bp)
        return -1;
      if (ap > bp)
        return 1;
      return 0;
    })

    return isBiggest ? newArray.reverse() : newArray;
}
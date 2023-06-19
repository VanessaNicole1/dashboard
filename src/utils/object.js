export const getObjectNestedValueByString = (obj, keyString) => {
  /**
   * keyString should have the format key.key2.key3
   * 
   * Example:
   * 
   * Suppose we have the next object:
   * 
   * const person = {
   *  direction: {
   *     street1: {
   *       name: 'La Habana',
   *       reference: 'main'
   *     },
   *     street2: {
   *         name: 'Salta',
   *         reference: 'secondary'
   *     }
   *  }
   *}
   *
   * to retrieve the value of street 1, we just need to pass a key string like:
   * direction.street1
   */
  if (!keyString) {
    return obj;
  }
  
  const keys = keyString.split('.');
  const combinedArrays = [obj].concat(keys);
  return combinedArrays.reduce((a, b) =>  a[b])
}

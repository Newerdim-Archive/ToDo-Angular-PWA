export {}

declare global {
  interface Array<T> {
    replace<T>(
      predicate: (
        value: T,
        index: number,
        array: T[]
      ) => boolean,
      newValue: T): T[],

    delete<T>(
      predicate: (
        value: T,
        index: number,
        array: T[]
      ) => boolean): T[],
  }
}

Array.prototype.replace = function (predicate, newValue) {
  const indexOfValueToReplace = this.findIndex(predicate);
  this[indexOfValueToReplace] = newValue;

  return this;
}

Array.prototype.delete = function (predicate) {
  const indexOfValueToDelete = this.findIndex(predicate);
  this.splice(indexOfValueToDelete, 1);

  return this;
}

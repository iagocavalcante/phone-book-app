type Nullable<T> = {
  [Property in keyof T]: null | T[Property];
};

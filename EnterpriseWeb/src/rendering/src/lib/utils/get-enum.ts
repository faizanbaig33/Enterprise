export interface EnumField<T> {
  fields?: {
    Value?: {
      value: T;
    };
  };
}

export const getEnum = <T>(field?: EnumField<T>): T | undefined => field?.fields?.Value?.value;

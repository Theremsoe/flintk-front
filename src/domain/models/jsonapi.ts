export interface Paginated {
  page: {
    currentPage: number;
    from: number;
    lastPage: number;
    perPage: number;
    to: number;
    total: number;
  };
}

export interface Signed {
  jsonapi: string;
}

export interface Timestamps {
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface Schema<T extends Timestamps> {
  id: string;
  type: string;
  attributes: T;
}

export interface JsonTemplate<M = Record<string, unknown>> extends Signed {
  meta: M;
}

export interface Resource<T> extends JsonTemplate {
  data: T;
}

export interface Collection<T> extends JsonTemplate<Paginated> {
  data: T[];
}

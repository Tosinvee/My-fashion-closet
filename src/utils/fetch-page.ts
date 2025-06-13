export async function fetchPage(
  model: any,
  {
    filter,
    pagination,
    populates = [],
    order = { updatedAt: -1 },
    trx = null,
    select,
  }: IPaginationPayload,
): Promise<IPaginationResponse> {
  const { count: perPage, page: currentPage } = pagination;
  const skip = (currentPage - 1) * perPage;

  let query = model
    .find({ ...filter })
    .skip(skip)
    .limit(perPage)
    .sort({ ...order })
    .session(trx);

  if (populates.length) {
    for (const populate of populates) {
      query = query.populate(populate);
    }
  }

  if (select) {
    query = query.select(select);
  }

  const [documents, totalDocuments] = await Promise.all([
    query.exec(),
    model
      .find({ ...filter })
      .count()
      .session(trx),
  ]);

  const totalPages = Math.ceil(totalDocuments / perPage);

  return {
    documents,
    meta: {
      currentPage,
      perPage,
      totalDocuments,
      totalPages,
    },
  };
}

interface IPagination {
  count: number;
  page: number;
}

export interface IMeta {
  currentPage: number;
  perPage: number;
  totalDocuments: number;
  totalPages: number;
}

export interface IPaginationPayload {
  filter?: any;
  pagination?: IPagination;
  populates?: { path: string; select: string; populate?: any; match?: any }[];
  order?: any;
  trx?: any;
  select?: string;
}

export interface IResponse {
  documents: any;
}

export interface IPaginationResponse {
  documents: any;
  meta: IMeta;
}
export interface ModelStatics {
  fetchPage: (T: IPaginationPayload) => Promise<IPaginationResponse>;
}

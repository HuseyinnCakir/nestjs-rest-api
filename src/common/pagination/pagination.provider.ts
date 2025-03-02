import { Inject, Injectable } from '@nestjs/common';
import { ObjectLiteral } from 'typeorm';
import { Paginated } from './interfaces/paginated.interface';
import { PaginationQueryDto } from './dtos/pagination-query.dto';
import { Repository } from 'typeorm';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable()
export class PaginationProvider {
  /**
   * Use Constructor to Inject Request
   * */
  constructor(@Inject(REQUEST) private readonly request: Request) {}

  public async paginateQuery<T extends ObjectLiteral>(
    paginationQuery: PaginationQueryDto,
    repository: Repository<T>,
  ): Promise<Paginated<T>> {
    let results = await repository.find({
      skip: (paginationQuery.page ?? 1 - 1) * (paginationQuery.limit ?? 10),
      take: paginationQuery.limit,
    });

    /**
     * Create the request URLs
     */
    const baseURL =
      this.request.protocol + '://' + this.request.headers.host + '/';
    const newUrl = new URL(this.request.url, baseURL);

    // Calculate page numbers
    const totalItems = await repository.count();
    const totalPages = Math.ceil(totalItems / (paginationQuery.limit ?? 10));
    const nextPage =
      paginationQuery.page === totalPages
        ? paginationQuery.page
        : paginationQuery.page ?? 1 + 1;
    const previousPage =
      paginationQuery.page === 1
        ? paginationQuery.page
        : paginationQuery.page ?? 1 - 1;

    let finalResponse = {
      data: results,
      meta: {
        itemsPerPage: paginationQuery.limit ?? 10,
        totalItems: totalItems,
        currentPage: paginationQuery.page ?? 1,
        totalPages: Math.ceil(totalItems / (paginationQuery.limit ?? 10)),
      },
      links: {
        first: `${newUrl.origin}${newUrl.pathname}?limit=${paginationQuery.limit}&page=1`,
        last: `${newUrl.origin}${newUrl.pathname}?limit=${paginationQuery.limit}&page=${totalPages}`,
        current: `${newUrl.origin}${newUrl.pathname}?limit=${paginationQuery.limit}&page=${paginationQuery.page}`,
        next: `${newUrl.origin}${newUrl.pathname}?limit=${paginationQuery.limit}&page=${nextPage}`,
        previous: `${newUrl.origin}${newUrl.pathname}?limit=${paginationQuery.limit}&page=${previousPage}`,
      },
    };

    return finalResponse;
  }
}
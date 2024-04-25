import { Injectable } from '@nestjs/common';
import { FindOptionsWhere, Repository } from 'typeorm';

import { FilterDto } from './dto/filter.dto';
import { PaginatedDto } from './dto/paginated.dto';

@Injectable()
export class PaginationService {
  async paginate<T>(
    repository: Repository<T>,
    filter: FilterDto,
    where?:  FindOptionsWhere<T>
  ): Promise<PaginatedDto<T>>{
    /* Pular os itens anteriores */
    const skip = (filter.page - 1) * filter.pageSize

    const take = filter.pageSize;

    const [ results, total ] = await repository.findAndCount({
      skip,
      take,
      where,
    });

    return {
      results,
      total,
      limit: skip,
      offset: take,
    }
  }
}

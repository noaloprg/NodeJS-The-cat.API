import { Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class CatService {
  constructor(
    private readonly httpService: HttpService
  ) { }
  create(createCatDto: CreateCatDto) {
    return 'This action adds a new cat';
  }

  findAll() {
    return `This action returns all cat`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cat`;
  }


  remove(id: number) {
    return `This action removes a #${id} cat`;
  }
}

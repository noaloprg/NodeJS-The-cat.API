import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

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

  // * CATS + BREEDS RANDOM
  // amount -> num of cats admin requests
  private async getCatsFromApi(amount: number) {
    try {
      /*
      tranforms Observable into Promise<AxiosResponse> to access AxiosResponse methods
      */
      const apiReponse = await firstValueFrom(this.httpService.get('/images/search', {
        params: { limit: amount }
      }))
      return apiReponse.data;
    }
    catch (error) {
      const status = error?.status || HttpStatus.INTERNAL_SERVER_ERROR;
      const message = error?.message || 'Error al conectar con Cat API';
      throw new HttpException(message, status);
    }
  }
}

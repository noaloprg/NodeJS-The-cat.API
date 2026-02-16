import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BreedService } from './breed.service';

@Controller('breed')
export class BreedController {
  constructor(private readonly breedService: BreedService) { }


}

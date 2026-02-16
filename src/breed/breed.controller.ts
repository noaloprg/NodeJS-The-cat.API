import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BreedService } from './breed.service';
import { CreateBreedDto } from './dto/create-breed.dto';
import { UpdateBreedDto } from './dto/update-breed.dto';

@Controller('breed')
export class BreedController {
  constructor(private readonly breedService: BreedService) {}

 
}

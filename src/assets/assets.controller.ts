import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { AssetsService } from './assets.service';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { error } from 'console';

@Controller('assets')
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}

  @Post()
  create(@Body() createAssetDto: CreateAssetDto) {
    return this.assetsService.create(createAssetDto);
  }

  @Get()
  findAll() {
    return this.assetsService.findAll().then(res=>{
      return {data: res}
    }). catch(error=> {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
    })
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.assetsService.findOne(id).then(res=>{
      return {data: res}
    }). catch(error=> {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
    })
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateAssetDto: UpdateAssetDto) {
    return this.assetsService.update(id, updateAssetDto).then(res=>{
      return {data: res}
    }). catch(error=> {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
    })
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.assetsService.remove(id);
  }
}

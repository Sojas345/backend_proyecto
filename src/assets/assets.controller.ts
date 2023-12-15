import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AssetsService } from './assets.service';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { Role } from '../common/enums/rol.enum';
import { ActiveUser } from '../common/decorators/active-user-decorator';
import { UserActiveInterface } from '../common/interfaces/user-active.interface';

@Auth(Role.USER)
@Controller('assets')
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}

  @Post()
  create(@Body() createAssetDto: CreateAssetDto, @ActiveUser() user: UserActiveInterface) {
    return this.assetsService.create(createAssetDto, user);
  }

  @Get()
findAll(@ActiveUser() user: UserActiveInterface) {
  return this.assetsService.findAll(user);
}

  @Get(':id')
  findOne(@Param('id') id: number,  @ActiveUser() user: UserActiveInterface) {
    return this.assetsService.findOne(id, user);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateAssetDto: UpdateAssetDto,  @ActiveUser() user: UserActiveInterface) {
    return this.assetsService.update(id, updateAssetDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: number,  @ActiveUser() user: UserActiveInterface) {
    return this.assetsService.remove(id, user);
  }
}

import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { OptionService } from './option.service';
import { CreateOptionDto } from './dto/create-option.dto';
import { UpdateOptionDto } from './dto/update-option.dto';
// import { UpdateOptionDto } from './dto/update-option.dto';

@Controller('/option')
export class OptionController {
  constructor(private readonly optionService: OptionService) {}

  @Post('/create')
  create(@Body() createOptionDto: CreateOptionDto) {
    return this.optionService.create(createOptionDto);
  }

  @Get()
  findAll() {
    return this.optionService.listOptions();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.optionService.findOne(id);
  }

  @Patch('update/:id')
  update(@Param('id') id: number, @Body() updateOptionDto: UpdateOptionDto) {
    return this.optionService.update(id, updateOptionDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: number) {
    return this.optionService.remove(id);
  }
}

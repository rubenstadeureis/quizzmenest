import { Controller, Post, Body, Get } from '@nestjs/common';
import { OptionService } from './option.service';
import { CreateOptionDto } from './dto/create-option.dto';
// import { UpdateOptionDto } from './dto/update-option.dto';

@Controller('/option')
export class OptionController {
  constructor(private readonly optionService: OptionService) {}

  @Post('/create')
  create(@Body() createOptionDto: CreateOptionDto) {
    return this.optionService.create(createOptionDto);
  }

  @Get()
  findAllOption() {
    return this.optionService.listOption();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.optionService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateOptionDto: UpdateOptionDto) {
  //   return this.optionService.update(+id, updateOptionDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.optionService.remove(+id);
  // }
}

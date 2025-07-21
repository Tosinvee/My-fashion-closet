import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ClosetService } from './closet.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorator/current-user';
import { User } from '../user/schema/user.schema';
import { ClosetItemDto } from './dto/upload-to-closetItem.dto';
import { UpdateClosetDto } from './dto/update-closet.dto';
import { ObjectId } from 'src/utils/mongoose/object-id';

@Controller('closet')
export class ClosetController {
  constructor(private closetService: ClosetService) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  async uploadClosetItem(
    @CurrentUser() user: User,
    @Body() body: ClosetItemDto,
  ) {
    return await this.closetService.uploadClosetItem(user.id, body);
  }

  @Get('/categories')
  async getCategories() {
    return this.closetService.getCategories();
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:id')
  async updateClosetItem(
    @Body() body: UpdateClosetDto,
    @Param('id') id: ObjectId,
  ) {
    return this.closetService.updateClosetItem(id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async deleteClosetItem(@Param('id') id: ObjectId) {
    return this.closetService.deleteClosetItem(id);
  }
}

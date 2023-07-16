import {
  Controller,
  Get,
  InternalServerErrorException,
  Logger,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AdminGuard } from '../guards/admin.guard';

@Controller('user')
export class UserController {
  private readonly logger = new Logger(UserController.name);
  constructor(private userService: UserService) {}

  @UseGuards(AdminGuard)
  @Serialize(UserDto)
  @Get('/')
  async getAllUser() {
    try {
      this.logger.log('Fetch all user request');
      return await this.userService.findAll();
    } catch (err) {
      this.logger.error(
        'Fetch all user request failed with error: ',
        err.stack,
      );
      throw new InternalServerErrorException();
    }
  }
}

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { HsbuserDto } from './dto/create-hsbuser.dto';
import { UpdateHsbuserDto } from './dto/update-hsbuser.dto';
import { hash, genSalt } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Hsbuser } from './entities/hsbuser.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { HandleException } from 'src/common/handleExeption';
import { ValidateId } from 'src/utils/idValidation';
import { defaultDatesData } from './dto/userVacations.dto';

@Injectable()
export class HsbusersService {
  private readonly exeptionLogger = new HandleException();

  constructor(
    @InjectRepository(Hsbuser)
    private readonly userRepository: Repository<Hsbuser>,
  ) {}
  async create({ password, ...userData }: HsbuserDto) {
    if (!ValidateId(userData.id)) {
      console.log(userData.id);
      throw new BadRequestException(
        `${userData.id} is not a valid identification`,
      );
    }

    const hashedPassword = await hash(password, await genSalt(8));

    const findUser = await this.userRepository.preload({ id: userData.id });

    if (findUser)
      throw new BadRequestException(
        `User with id: ${userData.id} already exist`,
      );

    const user = this.userRepository.create({
      ...userData,
      details: { ...userData.details, ...defaultDatesData },
      password: hashedPassword,
    });

    try {
      await this.userRepository.save(user);
      return user;
    } catch (error) {
      this.exeptionLogger.logException(error);
    }
  }

  findAll({ limit = 20, offset = 0 }: PaginationDto) {
    const users = this.userRepository.find({
      take: limit,
      skip: offset,
    });

    return users;
  }

  async findOne(id: string) {
    if (isNaN(Number(id)))
      throw new BadRequestException(`${id} is a not valid id`);

    const user = await this.userRepository.findOneBy({ id });

    if (!user) throw new NotFoundException(`user with id: ${id}, not found`);

    return user;
  }

  async findOneByEmail(email: string) {
    const user = await this.userRepository.findOneBy({ email });
    if (!user)
      throw new NotFoundException(
        `User with email ${email} does not exist, signup`,
      );

    return user;
  }

  async update(
    idUser: string,
    { id, password, ...userData }: UpdateHsbuserDto,
  ) {
    if (id && !ValidateId(id))
      throw new BadRequestException(`${id} is not a valid identification`);
    const user = await this.userRepository.preload({
      id: idUser,
      ...userData,
      password: password ? await hash(password, await genSalt(8)) : password,
    });

    if (!user)
      throw new NotFoundException(`User with id: ${idUser}, not found`);

    try {
      await this.userRepository.save(user);
      return user;
    } catch (error) {
      this.exeptionLogger.logException(error);
    }
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    try {
      await this.userRepository.remove(user);
      return true;
    } catch (error) {
      this.exeptionLogger.logException(error);
    }
  }
}

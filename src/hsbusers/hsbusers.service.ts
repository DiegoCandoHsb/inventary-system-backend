import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  UseGuards,
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

  async findAll({ limit = 1000, offset = 0 }: PaginationDto) {
    const users = await this.userRepository.find({
      take: limit,
      skip: offset,
    });

    const usersWithoutPassword = users.map((user) => {
      delete user.password;
      return user;
    });

    return usersWithoutPassword;
  }

  async findOne(id: string) {
    if (isNaN(Number(id)))
      throw new BadRequestException(`${id} is a not valid id`);

    const user = await this.userRepository.findOneBy({ id });

    if (!user) throw new NotFoundException(`user with id: ${id}, not found`);

    return user;
  }

  getUserCompleteName({
    name,
    details: { lastname, secondlastname, secondname },
  }: Hsbuser) {
    const userName = name.concat(
      ' ',
      secondname,
      ' ',
      lastname,
      ' ',
      secondlastname,
    );
    return userName;
  }

  // getUserIdName()

  async findOneByEmail(email: string) {
    const user = await this.userRepository.findOneBy({
      email: email.toLowerCase().trim(),
    });
    if (!user) throw new UnauthorizedException('Email or password incorrect');

    return user;
  }

  async findOnebyFullName(fullName: string) {
    const dividedName = fullName.split(' ');
    const user = await this.userRepository
      .createQueryBuilder('hsbuser')
      .where('hsbuser.name ILIKE :name', {
        name: `%${dividedName[0]}%`,
      })
      .andWhere("hsbuser.details->>'secondname' ILIKE :secondname", {
        secondname: `%${dividedName[1]}%`,
      })
      .andWhere("hsbuser.details->>'lastname' ILIKE :lastname", {
        lastname: `%${dividedName[2]}%`,
      })
      .andWhere("hsbuser.details->>'secondlastname' ILIKE :secondlastname", {
        secondlastname: `%${dividedName[3]}%`,
      })
      .getOne();

    return user;
  }

  async update(
    userId: string,
    { id, password, ...userData }: UpdateHsbuserDto,
  ) {
    if (id && !ValidateId(id))
      throw new BadRequestException(`${id} is not a valid identification`);
    const user = await this.userRepository.preload({
      id: userId,
      ...userData,
      password:
        password && password !== undefined
          ? await hash(password, await genSalt(8))
          : password,
    });

    if (!user) throw new NotFoundException(`User with id: ${userId} not found`);

    try {
      await this.userRepository.save(user);
      return user;
    } catch (error) {
      this.exeptionLogger.logException(error);
    }
  }

  async remove(id: string) {
    const user = (await this.findOne(id)) as Hsbuser;
    try {
      await this.userRepository.remove(user);
      return true;
    } catch (error) {
      this.exeptionLogger.logException(error);
    }
  }
}

import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as XLSX from 'xlsx';

import { HsbuserDto } from './dto/create-hsbuser.dto';
import { UpdateHsbuserDto } from './dto/update-hsbuser.dto';
import { Hsbuser } from './entities/hsbuser.entity';
import { HandleException } from 'src/common/handleExeption';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { ValidateId } from 'src/utils/idValidation';
import { defaultDatesData } from './dto/userVacations.dto';

@Injectable()
export class HsbusersService {
  private readonly exeptionLogger = new HandleException();

  constructor(
    @InjectRepository(Hsbuser)
    private readonly userRepository: Repository<Hsbuser>,
  ) {}
  async create(hsbuserDto: HsbuserDto | HsbuserDto[], usersArr?: HsbuserDto[]) {
    const users = usersArr ? usersArr : await this.findAll({});

    if (!Array.isArray(hsbuserDto)) {
      hsbuserDto = [hsbuserDto];
    }

    const promiseUsersArr = await Promise.all(
      hsbuserDto.map(async (userData) => {
        const userAlreadyExist = (users as HsbuserDto[]).find(
          (usr) => usr.id === userData.id,
        );

        if (userAlreadyExist && usersArr) {
          delete userData.password;
          return await this.update(userData.id, userData);
        }

        if (!ValidateId(userData.id) && !usersArr)
          throw new BadRequestException(
            `${userData.id} is not a valid identification`,
          );

        const hashedPassword = usersArr
          ? userData.password
          : bcrypt.hashSync(userData.password, bcrypt.genSaltSync(8));

        const findUser = await this.userRepository.preload({
          id: userData.id,
        });

        if (findUser && !usersArr) {
          throw new BadRequestException(
            `User with id: ${userData.id} already exist`,
          );
        }

        const user = this.userRepository.create({
          ...userData,
          details: { ...defaultDatesData, ...userData.details },
          password: hashedPassword,
        });

        return user;
      }),
    );
    return await this.userRepository.save(promiseUsersArr);
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
          ? await bcrypt.hash(password, await bcrypt.genSalt(8))
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

  async downloadUsersXlsx(users: HsbuserDto[], fileName: string) {
    if (!users) throw new UnprocessableEntityException();

    const plainData = users.map(({ details, ...userData }) => {
      const userDetails = {
        lastname: details.lastname,
        secondname: details.secondname,
        secondlastname: details.secondlastname,
        phone: details.phone,
        payroll: details.payroll,
        admissionDate: details.admissionDate,
      };

      return { ...userData, ...userDetails };
    });

    const worksheet = XLSX.utils.json_to_sheet(plainData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, fileName);

    return workbook;
  }

  async uploadUsersXlsx(usersFile: Express.Multer.File) {
    if (!usersFile) throw new UnprocessableEntityException('File error');

    const usersFromDb: HsbuserDto[] = await this.findAll({});

    const workbook = XLSX.read(usersFile.buffer, {
      type: 'buffer',
      cellDates: true,
    });

    const woorksheetData = [
      ...(XLSX.utils
        .sheet_to_json(workbook.Sheets[workbook.SheetNames[0]])
        .map(({ id, name, email, active, password, ...userData }) => {
          return {
            id: id.toString(),
            name,
            email,
            active: ['yes', 'true', 'si', 'verdadero'].includes(
              active.toString().toLowerCase(),
            ),
            password: bcrypt.hashSync(id.toString(), bcrypt.genSaltSync(8)),
            details: {
              vacations: [],
              ...userData,
            },
          };
        }) as HsbuserDto[]),
    ]
      .reverse()
      .filter((user, index, usersArr) => {
        if (
          index ===
            usersArr.findIndex(
              (userItem: HsbuserDto) => userItem.id === user.id,
            ) &&
          index ===
            usersArr.findIndex(
              (userItem: HsbuserDto) => userItem.email === user.email,
            )
        ) {
          if (!ValidateId(user.id)) {
            console.log('user ', user.id, 'no válido');
            return false;
          }
          return true;
        }
        return false;
      });

    await this.create(woorksheetData, usersFromDb);
    return 'success';
  }
}

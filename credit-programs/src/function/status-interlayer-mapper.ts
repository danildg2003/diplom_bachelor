import { Interlayer, InterlayersStatusesPrograms } from 'src/model/interlayerPrograms';
import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

export const statusInterlayerMapperPrograms = (interlayer: Interlayer<any>) => {
  switch (interlayer.extensions[0].code) {
    case InterlayersStatusesPrograms.NOT_FOUND: {
      throw new NotFoundException(interlayer.extensions[0].message);
    }
    case InterlayersStatusesPrograms.FORBIDDEN: {
      throw new ForbiddenException(interlayer.extensions[0].message);
    }
    case InterlayersStatusesPrograms.BAD_REQUEST: {
      throw new BadRequestException(interlayer.extensions[0].message);
    }
    case InterlayersStatusesPrograms.UNAUTHORIZED: {
      throw new UnauthorizedException(interlayer.extensions[0].message);
    }
    default: {
      throw new HttpException('Unknown error', 520);
    }
  }
};

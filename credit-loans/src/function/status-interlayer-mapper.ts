import { Interlayer, InterlayersStatusesLoans } from 'src/model/interlayerLoans';
import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

export const statusInterlayerMapperLoans = (interlayer: Interlayer<any>) => {
  switch (interlayer.extensions[0].code) {
    case InterlayersStatusesLoans.NOT_FOUND: {
      throw new NotFoundException(interlayer.extensions[0].message);
    }
    case InterlayersStatusesLoans.FORBIDDEN: {
      throw new ForbiddenException(interlayer.extensions[0].message);
    }
    case InterlayersStatusesLoans.BAD_REQUEST: {
      throw new BadRequestException(interlayer.extensions[0].message);
    }
    case InterlayersStatusesLoans.UNAUTHORIZED: {
      throw new UnauthorizedException(interlayer.extensions[0].message);
    }
    default: {
      throw new HttpException('Unknown error', 520);
    }
  }
};

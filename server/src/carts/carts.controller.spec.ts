import { Test, TestingModule } from '@nestjs/testing';
import { CartsController } from './carts.controller';
import { JwtService } from '@nestjs/jwt';
import { CartsService } from './carts.service';
import { PrismaService } from '../prisma/prisma.service'
import { AuthenticationGuard } from '../auth/guard/authentication-guard'
import { UnauthorizedException } from '@nestjs/common';
import { ValidationError } from 'class-validator';

describe('CartsController', () => {
  let controller: CartsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CartsController],
      providers:[
        JwtService,
        CartsService,
        PrismaService,
        {
          provide: AuthenticationGuard,
          useValue: {
            canActivate: jest.fn().mockReturnValue(true), // Mock canActivate behavior
          },
        }
      ]
    }).compile();

    controller = module.get<CartsController>(CartsController);
  });

  it('should be able to create a cart', async () => {
    const inputs = {
      user_id:1,
      name:'cart_name'
    }
    jest.spyOn(controller, 'create_cart').mockResolvedValue({
      id:1, ...inputs
    })
    const req = {
      user:{
        id:1
      }
    }
    const res = await controller.create_cart(inputs, req)
    expect(res).toEqual(expect.any(Object))
  })

  it('should return unauthorized error', async () => {
    const inputs = {
      user_id:1,
      name:'name'
    }
    jest.spyOn(controller, 'create_cart').mockImplementation(() => {
      throw new UnauthorizedException('You are not authorized')
    })
    const req = {
      user:{
        id:1
      }
    }
    try {
      await controller.create_cart(inputs, req)
    } catch (error) {
      expect(error).toEqual(expect.any(UnauthorizedException))
    }
  })

  it('should return validation error', async () => {
    const inputs = {
      user_id:1,
      name:''
    }
    jest.spyOn(controller, 'create_cart').mockImplementation(() => {
      throw new ValidationError()
    })
    const req = {
      user:{
        id:'user_id'
      }
    }
    try {
      await controller.create_cart(inputs, req)
    } catch (error) {
      expect(error).toEqual(expect.any(ValidationError))
    }
  })

  it('should return the carts of the user', async () => {
    jest.spyOn(controller, 'fetch_carts').mockResolvedValue([
      {id:1,user_id:1, name:'cart_name'}
    ])
    const req = {
      user:{
        id:1
      }
    }

    const res = await controller.fetch_carts(req)
    expect(res).toEqual(expect.any(Object))
  })

  it('should return a cart of the user', async () => {
    jest.spyOn(controller, 'fetch_cart').mockResolvedValue(
      {id:1,user_id:1, name:'cart_name'}
    )
    const res = await controller.fetch_cart('1')
    expect(res).toEqual(expect.any(Object))
  })

  it('should be able to update a cart', async () => {
    const inputs = {
      user_id:1,
      name:'cart_name'
    }
    jest.spyOn(controller, 'update_cart').mockResolvedValue({
      id:1, ...inputs
    })
    const req = {
      user:{
        id:1
      }
    }
    const res = await controller.update_cart('1', {
      id: 1,
      user_id:1,
      name:'cart_name'
    })
    expect(res).toEqual(expect.any(Object))
  })


  it('should be able to delete a cart', async () => {
    jest.spyOn(controller, 'delete_cart').mockResolvedValue({
      id:1,
      user_id:1,
      name:'cart_name'
    })
    const res = await controller.delete_cart('1')
    expect(res).toEqual(expect.any(Object))
  })
});

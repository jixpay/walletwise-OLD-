import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from './orders.controller';
import { JwtService } from '@nestjs/jwt';
import { OrdersService } from './orders.service';
import { PrismaService } from '../prisma/prisma.service'
import { AuthenticationGuard } from '../auth/guard/authentication-guard'
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { OrderproductsService } from '../orderproducts/orderproducts.service'

describe('OrdersController', () => {
  let controller: OrdersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers:[JwtService, OrdersService, PrismaService,{
        provide: AuthenticationGuard,
        useValue: {
          canActivate: jest.fn().mockReturnValue(true), // Mock canActivate behavior
        },
      },
      OrderproductsService
    ],
      controllers: [OrdersController],
    }).compile();

    controller = module.get<OrdersController>(OrdersController);
  });

  it('should be able to create an order', async () => {
    const inputs = {
      cart_id:1,
      mode_of_payment:'COD',
      total:9999,
      destination:'some address',
      status:'PENDING',
      user_id:1,
      message:''
    }
    jest.spyOn(controller, 'create_order').mockResolvedValue({
      id:1, ...inputs
    })
    const req = {
      user:{
        id:1
      }
    }
    const res = await controller.create_order(inputs, req)
    expect(res).toEqual(expect.any(Object))
  })

  it('should return unauthorized error', async () => {
    const inputs = {
      cart_id:1,
      mode_of_payment:'COD',
      total:9999,
      destination:'some address',
      status:'PENDING',
      user_id:1,
      message:''
    }
    jest.spyOn(controller, 'create_order').mockImplementation(() => {throw new UnauthorizedException('You are not authorized')})
    const req = {
      user:{
        id:1
      }
    }
    try {
      await controller.create_order(inputs, req)
      fail(BadRequestException)
    } catch (error) {
      expect(error).toBeInstanceOf(UnauthorizedException)
    }
  })

  it('should return a validation error', async () => {
    const inputs = {
      cart_id:1,
      mode_of_payment:'',
      total:9999,
      destination:'',
      status:'PENDING',
      user_id:1,
      message:''
    }
    jest.spyOn(controller, 'create_order').mockImplementation(() => {throw new ValidationError()})
    const req = {
      user:{
        id:1
      }
    }
    try {
      await controller.create_order(inputs, req)
      fail(BadRequestException)
    } catch (error) {
      expect(error).toBeInstanceOf(ValidationError)
    }
  })

  it('should be able to fetch the user orders', async () => {
    jest.spyOn(controller, 'fetch_orders').mockResolvedValue([
      {
        id:1,
        mode_of_payment:'COD',
        total:9999,
        destination:'',
        user_id:1,
        message:''
      }
    ])
    const req = {
      user:{
        id:1
      }
    }
    const res = await controller.fetch_orders(req)
    expect(res).toEqual(expect.any(Array))
  })

  it('should be able to fetch a single order', async () => {
    jest.spyOn(controller, 'fetch_order').mockResolvedValue(
      {
        id:1,
        mode_of_payment:'COD',
        total:9999,
        destination:'',
        user_id:1,
        message:''
      }
    )
    const res = await controller.fetch_order('1')
    expect(res).toEqual(expect.any(Object))
  })
});

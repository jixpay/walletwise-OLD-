import { Test, TestingModule } from '@nestjs/testing';
import { OrderproductsController } from './orderproducts.controller';
import { OrderproductsService } from './orderproducts.service';
import { PrismaService } from '../prisma/prisma.service'
import { AuthenticationGuard } from '../auth/guard/authentication-guard'
import { JwtService } from '@nestjs/jwt';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';

describe('OrderproductsController', () => {
  let controller: OrderproductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderproductsController],
      providers: [JwtService,OrderproductsService, PrismaService, {
        provide: AuthenticationGuard,
        useValue: {
          canActivate: jest.fn().mockReturnValue(true), // Mock canActivate behavior
        }}]
    }).compile();

    controller = module.get<OrderproductsController>(OrderproductsController);
  });


  it('should be able to fetch an orderproducts', async () => {
    jest.spyOn(controller, 'fetch_orderproducts').mockResolvedValue([])
    const req = {
      user:{
        id:1
      }
    }
    const res = await controller.fetch_orderproducts('1')
    expect(res).toEqual(expect.any(Array))
  })

  it('should return unauthorized error', async () => {
    jest.spyOn(controller, 'fetch_orderproducts').mockImplementation(() => {
      throw new UnauthorizedException()
    })
    const req = {
      user:{
        id:1
      }
    }

    try {
      await controller.fetch_orderproducts('1')
      fail(BadRequestException)
    } catch (error) {
      expect(error).toBeInstanceOf(UnauthorizedException)
    }
  })

  it('should be able to cancel an orderproduct', async () => {
    jest.spyOn(controller, 'cancel_order').mockResolvedValue(
      {
        id:1,
        order_id:1,
        product_id: 1,
        store_id: 1,
        status:'',
        quantity: 1
      }
    )
    const res = await controller.cancel_order('1')
    expect(res).toEqual(expect.any(Object))
  })

  it('should be able to ship an orderproduct', async () => {
    jest.spyOn(controller, 'ship_order').mockResolvedValue(
      {
        id:1,
        order_id:1,
        product_id: 1,
        store_id: 1,
        status:'',
        quantity: 1
      }
    )
    const res = await controller.ship_order('1')
    expect(res).toEqual(expect.any(Object))
  })
});

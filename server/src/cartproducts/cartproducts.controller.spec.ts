import { Test, TestingModule } from '@nestjs/testing';
import { CartproductsController } from './cartproducts.controller';
import { PrismaService } from '../prisma/prisma.service'
import { CartproductsService } from './cartproducts.service';
import { JwtService } from '@nestjs/jwt';
import { AuthenticationGuard } from '../auth/guard/authentication-guard'
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { ValidationError } from 'class-validator';

describe('CartproductsController', () => {
  let controller: CartproductsController;

  beforeEach(async () => {
    const module1: TestingModule = await Test.createTestingModule({
      controllers: [CartproductsController],
      providers:[PrismaService, JwtService, CartproductsService,{
        provide: AuthenticationGuard,
        useValue: {
          canActivate: jest.fn().mockReturnValue(true), // Mock canActivate behavior
        },
      }]
    }).compile();

    controller = module1.get<CartproductsController>(CartproductsController);
  });

  it('should be able to add to cart', async () => {
    const inputs = {
      cart_id:1,
      product_id:1,
      quantity:99
    }
    jest.spyOn(controller, 'create_cartproduct').mockResolvedValue({
      id:1, ...inputs
    })
    const res = await controller.create_cartproduct(inputs)
    expect(res).toEqual(expect.any(Object))
  })

  it('should return unauthorized error', async () => {
    const inputs = {
      cart_id:1,
      product_id:1,
      quantity:99
    }
    jest.spyOn(controller, 'create_cartproduct').mockImplementation(() => {
      throw new UnauthorizedException('You are not authorized')
    })
    try {
      await controller.create_cartproduct(inputs)
      fail(BadRequestException)
    } catch (error) {
      expect(error).toBeInstanceOf(UnauthorizedException)
    }
  })

  it('should return validation error', async () => {
    const inputs = {
      cart_id:1,
      product_id:1,
      quantity:99
    }
    jest.spyOn(controller, 'create_cartproduct').mockImplementation(() => {
      throw new ValidationError()
    })
    try {
      await controller.create_cartproduct(inputs)
      fail(BadRequestException)
    } catch (error) {
      expect(error).toBeInstanceOf(ValidationError)
    }
  })

  it('should return cart products of a cart', async () => {
    jest.spyOn(controller, 'fetch_cartproducts').mockResolvedValue([
      {
        id:1,
        cart_id:1,
        product_id:1,
        quantity:99
      }
    ])
    const res = await controller.fetch_cartproducts('1')
    expect(res).toEqual(expect.any(Array))
  })

  it('should return a cart product', async () => {
    jest.spyOn(controller, 'fetch_cartproduct').mockResolvedValue(
      {
        id:1,
        cart_id:1,
        product_id:1,
        quantity:99
      }
    )
    const res = await controller.fetch_cartproduct('1')
    expect(res).toEqual(expect.any(Object))
  })

  it('should be able to update a cart product', async () => {
    const inputs = {
      cart_id:1,
      product_id:1,
      quantity:99
    }
    jest.spyOn(controller, 'update_cartproduct').mockResolvedValue(
      {
        id:1,
        ...inputs
      }
    )
    const res = await controller.update_cartproduct('1', inputs)
    expect(res).toEqual(expect.any(Object))
  })

  it('should be able to delete a cart product', async () => {
    jest.spyOn(controller, 'delete_cartproduct').mockResolvedValue(
      {
        id:1,
        cart_id:1,
        product_id:1,
        quantity:99
      }
    )
    const res = await controller.delete_cartproduct('1')
    expect(res).toEqual(expect.any(Object))
  })
});

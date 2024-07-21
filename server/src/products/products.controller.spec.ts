import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { JwtService } from '@nestjs/jwt';
import { ProductsService } from './products.service';
import { PrismaService } from '../prisma/prisma.service'
import { AuthenticationGuard } from '../auth/guard/authentication-guard'
import mockFile from '../auth/mockrequest/filerequest'
import { ValidationError } from 'class-validator';
import { UnauthorizedException } from '@nestjs/common';

describe('ProductsController', () => {
  let controller: ProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers:[JwtService, ProductsService, PrismaService,         {
        provide: AuthenticationGuard,
        useValue: {
          canActivate: jest.fn().mockReturnValue(true), // Mock canActivate behavior
        },
      },]
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
  });

  it('should be able to upload a store image', async () => {
    jest.spyOn(controller, 'upload_image').mockResolvedValue('imageurl')
    const res = await controller.upload_image(mockFile)
    expect(res).toEqual('imageurl')
  })

  it('should be able to create a product', async () => {
    const inputs = {
      name:'name',
      description:'description',
      store_id:1,
      price:9, 
      stocks:9,
      category:'category',
      image:'imageurl'
    }
    jest.spyOn(controller, 'create_product').mockResolvedValue({...inputs, id: 1})
    const res = await controller.create_product(inputs)
    expect(res).toEqual({...inputs, id: 1})
  })

  it('should return a validation error', async () => {
    const inputs = {
      name:'',
      description:'',
      store_id:1,
      price:0, 
      stocks:0,
      category:'',
      image:''
    }
    jest.spyOn(controller, 'create_product').mockResolvedValue({...inputs, id: 1})
  try {
    await controller.create_product(inputs)
  } catch (error) {
    expect(error).toBeInstanceOf(ValidationError)
  }
  })

  it('should return an unauthorized error', async () => {
    const inputs = {
      name:'name',
      description:'description',
      store_id:1,
      price:9, 
      stocks:9,
      category:'category',
      image:'imageurl'
    }
    jest.spyOn(controller, 'create_product').mockImplementation(() => {
      throw new UnauthorizedException('You are not authorized');
    });
  try {
    await controller.create_product(inputs)
  } catch (error) {
    expect(error).toBeInstanceOf(UnauthorizedException)
  }
  })

  it('should be able to fetch all the store products', async () => {
    const spy = jest.spyOn(controller, 'fetch_store_products');
    spy.mockResolvedValue([
      {
        id:1,
        name:'name',
        description:'description',
        store_id:1,
        price:9, 
        stocks:9,
        category:'category',
        image:'imageurl'
      }
    ]);
    const stores = await controller.fetch_store_products('1');
    expect(stores).toEqual(expect.any(Array))
  });

  it('should be able to view single store product', async () => {
    const spy = jest.spyOn(controller, 'fetch_product');
    spy.mockResolvedValue(
      {
        id:1,
        name:'name',
        description:'description',
        store_id:1,
        price:9, 
        stocks:9,
        category:'category',
        image:'imageurl'
      }
    );
    const res = await controller.fetch_product('1');
    expect(res).toEqual(expect.any(Object))
  });

  it('should be able to fetch all the products', async () => {
    const spy = jest.spyOn(controller, 'fetch_products');
    spy.mockResolvedValue(
      [{
        id:1,
        name:'name',
        description:'description',
        store_id:1,
        price:9, 
        stocks:9,
        category:'category',
        image:'imageurl'
      }]
    );
    const res = await controller.fetch_products();
    expect(res).toEqual(expect.any(Array))
  });

  it('should be able to update a product', async () => {
    const updatestorespy = jest.spyOn(controller, 'update_product');
    updatestorespy.mockResolvedValue({
        id:1,
        name:'name',
        description:'description',
        store_id:1,
        price:9, 
        stocks:9,
        category:'category',
        image:'imageurl'
    });
    const stores = await controller.update_product('1',{
      id:1,
      name:'name',
      description:'description',
      store_id:1,
      price:9, 
      stocks:9,
      category:'category',
      image:'imageurl'
    });
    expect(stores).toEqual(expect.any(Object))
  })

  it('should be able to delete a product', async () => {
    const deletestorespy = jest.spyOn(controller, 'delete_product');
    deletestorespy.mockResolvedValue({
      id:1,
      name:'name',
      description:'description',
      store_id:1,
      price:9, 
      stocks:9,
      category:'category',
      image:'imageurl'
    });
    const stores = await controller.delete_product('1');
    expect(stores).toEqual(expect.any(Object))
  })
});

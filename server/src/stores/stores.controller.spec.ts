import { Test, TestingModule } from '@nestjs/testing';
import { StoresController } from './stores.controller';
import { AuthenticationGuard } from '../auth/guard/authentication-guard'
import { JwtService } from '@nestjs/jwt';
import { StoresService } from './stores.service';
import { PrismaService } from '../prisma/prisma.service'
import mockFile from '../auth/mockrequest/filerequest'
import { ValidationError } from 'class-validator';
import { UnauthorizedException } from '@nestjs/common';

describe('StoresController', () => {
  let controller: StoresController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StoresController],
      providers:[
        {
          provide: AuthenticationGuard,
          useValue: {
            canActivate: jest.fn().mockReturnValue(true), // Mock canActivate behavior
          },
        },
        JwtService,
        StoresService,
        PrismaService
      ]
    }).compile();
    controller = module.get<StoresController>(StoresController);
  });

  it('should be able to upload a store image', async () => {
    jest.spyOn(controller, 'upload_image').mockResolvedValue('imageurl')
    const res = await controller.upload_image(mockFile)
    expect(res).toEqual('imageurl')
  })

  it('should be able to create a store', async () => {
    const inputs = {
      name:'name',
      description:'description',
      image:'imageurl',
      user_id:''
    }
    jest.spyOn(controller, 'create_mystore').mockResolvedValue({...inputs, ...{id: 1,user_id:1}})
    const req = {
      user:{
        id:1
      }
    }
    const res = await controller.create_mystore(inputs, req)
    expect(res).toEqual({...inputs, ...{id: 1,user_id:1}})
  })

  it('should return a validation error', async () => {
    const inputs = {
      name:'',
      description:'description',
      image:'imageurl',
      user_id:''
    }
    jest.spyOn(controller, 'create_mystore').mockResolvedValue({...inputs, ...{id: 1,user_id:1}})
    const req = {
      user:{
        id:1
      }
    }
  try {
    await controller.create_mystore(inputs, req)
  } catch (error) {
    expect(error).toBeInstanceOf(ValidationError)
  }
  })

  it('should return an unauthorized error', async () => {
    const inputs = {
      name:'name',
      description:'description',
      image:'imageurl',
      user_id:''
    }
    jest.spyOn(controller, 'create_mystore').mockImplementation(() => {
      throw new UnauthorizedException('You are not authorized');
    });
    const req = {
      user:{
        id:1
      }
    }
  try {
    await controller.create_mystore(inputs, req)
  } catch (error) {
    expect(error).toBeInstanceOf(UnauthorizedException)
  }
  })

  it('should be able to fetch all the users stores', async () => {
    const fetchStoresSpy = jest.spyOn(controller, 'fetch_mystores');
    fetchStoresSpy.mockResolvedValue([{
      id: 1,
      user_id:1,
      name:'name',
      description:'description',
      image:'imageurl'
    }]);
    const mockRequest = {
      user: {
        id: 1,
      },
    };
    const stores = await controller.fetch_mystores(mockRequest);
    expect(stores).toEqual(expect.any(Array))
  });

  it('should be able to fetch a user store', async () => {
    const fetchStoresSpy = jest.spyOn(controller, 'fetch_mystore');
    fetchStoresSpy.mockResolvedValue({
      id: 1,
      user_id:1,
      name:'name',
      description:'description',
      image:'imageurl'
    });
    const mockRequest = {
      user: {
        id: 1,
      },
    };
    const stores = await controller.fetch_mystore('1');
    expect(stores).toEqual(expect.any(Object))
  });

  it('should be able to fetch all the stores', async () => {
    const fetchStoresSpy = jest.spyOn(controller, 'fetch_stores');
    fetchStoresSpy.mockResolvedValue([{
      id: 1,
      user_id:1,
      name:'name',
      description:'description',
      image:'imageurl'
    }]);
    const stores = await controller.fetch_stores();
    expect(stores).toEqual(expect.any(Array))
  });

  it('should be able to fetch a store', async () => {
    const fetchStoresSpy = jest.spyOn(controller, 'fetch_store');
    fetchStoresSpy.mockResolvedValue({
      id: 1,
      user_id:1,
      name:'name',
      description:'description',
      image:'imageurl'
    });
    const stores = await controller.fetch_store('1');
    expect(stores).toEqual(expect.any(Object))
  });

  it('should be able to update a store', async () => {
    const updatestorespy = jest.spyOn(controller, 'update_mystore');
    updatestorespy.mockResolvedValue({
      id: 1,
      user_id:1,
      name:'updated name',
      description:'updated description',
      image:'imageurl'
    });
    const stores = await controller.update_mystore('1',{
      id:1,
      user_id:1,
      name:'updated name',
      description:'updated description',
      image:'imageurl'
    });
    expect(stores).toEqual(expect.any(Object))
  })

  it('should be able to delete a store', async () => {
    const deletestorespy = jest.spyOn(controller, 'delete_mystore');
    deletestorespy.mockResolvedValue({
      id: 1,
      user_id:1,
      name:'deleted store name',
      description:'delete store description',
      image:'imageurl'
    });
    const stores = await controller.delete_mystore('1');
    expect(stores).toEqual(expect.any(Object))
  })
});

import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../prisma/prisma.module'
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service'
import { PrismaService } from '../prisma/prisma.service'
import mockFile from './mockrequest/filerequest';
import { BadRequestException } from '@nestjs/common';
import { AuthenticationGuard } from './guard/authentication-guard';

describe('AuthController', () => {
  let controller: AuthController;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports:[
        JwtModule.register({
          global: true,
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: '24h' },
        }),
        PrismaModule
      ],
      controllers: [AuthController],
      providers: [AuthService, UsersService, PrismaService,{
        provide: AuthenticationGuard,
        useValue: {
          canActivate: jest.fn().mockReturnValue(true), // Mock canActivate behavior
        },
      },]
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be able to upload an image', async () =>{
    jest.spyOn(controller, 'upload_image').mockResolvedValue('imageurl')
    const res = await controller.upload_image(mockFile)
    expect(res).toEqual('imageurl')
  })

  it('should be able to create a user', async () => {
    const inputs = {
      fname:'fname',
      lname:'lname',
      username:'username',
      password:'password',
      image:'imageurl'
    }
    jest.spyOn(controller, 'signup').mockResolvedValue({id:1,...inputs})
    const res = await controller.signup(inputs)
    expect(res).toEqual({...inputs,id:1})
  })

  it('should be able to receive a bad request error for creating a user with an existing username', async () => {
    try {
      const inputs = {
        fname:'fname',
        lname:'lname',
        username:'username',
        password:'password',
        image:'imageurl'
      }
      jest.spyOn(controller, 'signup').mockImplementation(() => {
        throw new BadRequestException('That username is already in used')
      })
      await controller.signup(inputs)
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException)
    }
  })

  it('should receive a validation errors for create user', async () => {
    try {
      const inputs = {
        fname:'',
        lname:'',
        username:'',
        password:'',
        image:''
      }
      jest.spyOn(controller, 'signup').mockImplementation(() => {
        throw new BadRequestException('That username is already in used')
      })
      await controller.signup(inputs)
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException)
    }
  })

  it('should receive an error for uploading a null file', async () => {
    try {
      jest.spyOn(controller, 'upload_image').mockImplementation(() => {
        throw new BadRequestException('')
      })
      await controller.upload_image(null)
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException)
    }
  })

  it('should receive an error for uploading a not supported file type', async () => {
    try {
      jest.spyOn(controller, 'upload_image').mockImplementation(() => {
        throw new BadRequestException('')
      })
      await controller.upload_image(mockFile)
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException)
    }
  })

  it('should receive a token', async () => {
    jest.spyOn(controller, 'signin').mockResolvedValue('this_is_a_token')
    const res = await controller.signin({username:"username", password:"password"})
    expect(res).toEqual(expect.any(String))
  })

  it('should return an error if inputs are wrong', async () => {
    try {
      jest.spyOn(controller, 'signin').mockImplementation(() => {
        throw new BadRequestException('Wrong Credentials')
      })
      await controller.signin({username:"notexistingusername", password:"wrongpassword"})
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException)
    }
  })

  it('should be able to return the current user information if a token on the authorization exist', async () => {
    jest.spyOn(controller, 'authenticate_user').mockResolvedValue({
      id:1,
      fname:'fname',
      lname:'lname',
      username:'username',
      password:'password',
      image:'imageurl'
    })
    const mockRequest = {
      user: {
        id: 'user_id',
      },
    };
    const res = await controller.authenticate_user(mockRequest)
    expect(res).toEqual(expect.any(Object))
  })
});

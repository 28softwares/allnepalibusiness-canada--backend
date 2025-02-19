/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import type { TsoaRoute } from '@tsoa/runtime';
import {  fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { MediaController } from './../controllers/media/Media.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { BusinessController } from './../controllers/business/Business.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { UserAuthController } from './../controllers/auth/userAuth.controller';
import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from 'express';
const multer = require('multer');




// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "MediaType": {
        "dataType": "refEnum",
        "enums": ["BUSINESS_LOGO","BUSINESS_COVER","BUSINESS_REGISTRATION","OWNER_IDENTIFICATION_DOCUMENT","PASSPORT","DRIVERS_LICENSE","NATIONAL_ID","OTHER"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Media": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "createdAt": {"dataType":"datetime","required":true},
            "updatedAt": {"dataType":"datetime","required":true},
            "deletedAt": {"dataType":"datetime","required":true},
            "mimeType": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
            "type": {"ref":"MediaType","required":true},
            "businessRegistration": {"dataType":"string","required":true},
            "businessLogo": {"dataType":"string","required":true},
            "ownerId": {"dataType":"string","required":true},
            "businessCover": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "BusinessType": {
        "dataType": "refEnum",
        "enums": ["INSURANCE","FINANCE","HEALTHCARE","TECHNOLOGY","RETAIL","WHOLESALE"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateBusinessDTO": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "email": {"dataType":"string","required":true},
            "type": {"ref":"BusinessType","required":true},
            "registrationDocument": {"dataType":"string","required":true},
            "ownerIDDocument": {"dataType":"string","required":true},
            "provinceTerritory": {"dataType":"string","required":true},
            "city": {"dataType":"string","required":true},
            "postalCode": {"dataType":"string","required":true},
            "phone": {"dataType":"string","required":true},
            "website": {"dataType":"string","required":true},
            "description": {"dataType":"string","required":true},
            "logo": {"dataType":"string","required":true},
            "cover": {"dataType":"string","required":true},
            "socialHandles": {"dataType":"nestedObjectLiteral","nestedProperties":{"youtube":{"dataType":"string","required":true},"linkedin":{"dataType":"string","required":true},"twitter":{"dataType":"string","required":true},"instagram":{"dataType":"string","required":true},"facebook":{"dataType":"string","required":true}},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AppResponseStatusEnum": {
        "dataType": "refEnum",
        "enums": ["success","error","TOKEN_UPDATED","TOKEN_EXPIRED","OTP_SENT"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AppResponse__username-string--emai-string__": {
        "dataType": "refObject",
        "properties": {
            "statusCode": {"dataType":"double","required":true},
            "status": {"ref":"AppResponseStatusEnum","required":true},
            "message": {"dataType":"string","required":true},
            "data": {"dataType":"nestedObjectLiteral","nestedProperties":{"emai":{"dataType":"string","required":true},"username":{"dataType":"string","required":true}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RegisterUserDTO": {
        "dataType": "refObject",
        "properties": {
            "username": {"dataType":"string","required":true},
            "email": {"dataType":"string","required":true},
            "password": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AppResponse__token-any__": {
        "dataType": "refObject",
        "properties": {
            "statusCode": {"dataType":"double","required":true},
            "status": {"ref":"AppResponseStatusEnum","required":true},
            "message": {"dataType":"string","required":true},
            "data": {"dataType":"nestedObjectLiteral","nestedProperties":{"token":{"dataType":"any","required":true}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new ExpressTemplateService(models, {"noImplicitAdditionalProperties":"throw-on-extras","bodyCoercion":true});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa




export function RegisterRoutes(app: Router,opts?:{multer?:ReturnType<typeof multer>}) {

    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################

    const upload = opts?.multer ||  multer({"limits":{"fileSize":8388608}});

    
        const argsMediaController_upload: Record<string, TsoaRoute.ParameterSchema> = {
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
                file: {"in":"formData","name":"file","required":true,"dataType":"file"},
                mediaType: {"in":"formData","name":"mediaType","required":true,"dataType":"string"},
        };
        app.post('/api/v1/media',
            upload.fields([
                {
                    name: "file",
                    maxCount: 1
                }
            ]),
            ...(fetchMiddlewares<RequestHandler>(MediaController)),
            ...(fetchMiddlewares<RequestHandler>(MediaController.prototype.upload)),

            async function MediaController_upload(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsMediaController_upload, request, response });

                const controller = new MediaController();

              await templateService.apiHandler({
                methodName: 'upload',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsBusinessController_createBusiness: Record<string, TsoaRoute.ParameterSchema> = {
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
                body: {"in":"body","name":"body","required":true,"ref":"CreateBusinessDTO"},
        };
        app.post('/api/v1/business',
            ...(fetchMiddlewares<RequestHandler>(BusinessController)),
            ...(fetchMiddlewares<RequestHandler>(BusinessController.prototype.createBusiness)),

            async function BusinessController_createBusiness(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsBusinessController_createBusiness, request, response });

                const controller = new BusinessController();

              await templateService.apiHandler({
                methodName: 'createBusiness',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUserAuthController_register: Record<string, TsoaRoute.ParameterSchema> = {
                user: {"in":"body","name":"user","required":true,"ref":"RegisterUserDTO"},
        };
        app.post('/api/v1/user/register',
            ...(fetchMiddlewares<RequestHandler>(UserAuthController)),
            ...(fetchMiddlewares<RequestHandler>(UserAuthController.prototype.register)),

            async function UserAuthController_register(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUserAuthController_register, request, response });

                const controller = new UserAuthController();

              await templateService.apiHandler({
                methodName: 'register',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUserAuthController_login: Record<string, TsoaRoute.ParameterSchema> = {
                user: {"in":"body","name":"user","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"password":{"dataType":"string","required":true},"email":{"dataType":"string","required":true}}},
        };
        app.post('/api/v1/user/login',
            ...(fetchMiddlewares<RequestHandler>(UserAuthController)),
            ...(fetchMiddlewares<RequestHandler>(UserAuthController.prototype.login)),

            async function UserAuthController_login(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUserAuthController_login, request, response });

                const controller = new UserAuthController();

              await templateService.apiHandler({
                methodName: 'login',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

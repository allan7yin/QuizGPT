// import express, { Request, Response } from "express";
// import { AccountService } from "../services/accountService";
// import { AuthMqService } from "../services/authMqService";
// import { LoginRequestDto } from "../dtos/loginRequestDto";

// const accountController = express.Router();

// accountController.post("/api/account/login", (req: Request, res: Response) => {
//     try {
//         const authMqService = new AuthMqService();
//         const accounService = new AccountService();

//         const correlationID = await authMqService.SendLoginRequestDto(req.body);
//         const trueResponse = await accounService.FindFirstByResponseContaining(correlationID);

//         if (trueResponse === null) {
//             throw Error("CorrelationId not found")
//         }
//         const responseJSON = trueResponse.response.substring(21);
//     }
// });

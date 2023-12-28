import type {NextApiRequest, NextApiResponse} from 'next'
import {prisma} from '../../../utils/db/db_browser';
import "@/pages/api/utils/patch/bigint_patch";
import {setCookie} from "cookies-next";
import HttpCode from "../../../utils/http_code";
import Generator from "@/pages/api/utils/generation/generator";
import StatusCode from "@/pages/api/utils/status_code";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    try {
        const {account, password} = req.body;
        if (account.length < 6 || password.length < 6) {
            res.status(HttpCode.OK).json({
                code: HttpCode.ERROR_LOGIN_ACCOUNT_FORMAT_CODE,
                msg: HttpCode.ERROR_LOGIN_ACCOUNT_FORMAT_MSG,
                data: {}
            });
            return;
        }
        const userAccount = await prisma.baco_users.findFirst({
            where: {
                account: `${account}`,
            }
        });
        //account doesn't exist
        if (!userAccount) {
            res.status(HttpCode.OK).json({
                code: HttpCode.ERROR_LOGIN_USER_CREATED_CODE,
                msg: HttpCode.ERROR_LOGIN_USER_CREATED_MSG,
                data: {}
            });
            return
        }
        //wrong passwords
        if (userAccount.password !== `${password}`) {
            res.status(HttpCode.OK).json({
                code: HttpCode.ERROR_LOGIN_PWD_CODE,
                msg: HttpCode.ERROR_LOGIN_USER_OR_PWD_MSG,
                data: {}
            });
            return
        }
        //account banned
        if (userAccount.status === 0) {
            res.status(HttpCode.OK).json({
                code: HttpCode.ERROR_LOGIN_USER_BANNED_CODE,
                msg: HttpCode.ERROR_LOGIN_USER_BANNED_MSG,
                data: {}
            });
            return
        }
        //update users token
        let token = Generator.createTokenStr();
        await prisma.s_user.update({
            where: {
                view_id: `${userAccount.view_id}`
            },
            data: {
                token: token
            }
        }).then((r: any) => {
            setCookie("uvid", `${userAccount.view_id}`, {res: res, req: req});
            setCookie("token", `${token}`, {res: res, req: req});
            res.status(HttpCode.OK).json({code: HttpCode.OK, msg: "success", data: {}});
        }).catch((reason: any) => {
            res.status(HttpCode.OK).json({code: 500, msg: "server error", data: {api: "login", data: reason}});
        });

    } catch (e: any) {
        res.status(HttpCode.OK).json({code: 500, msg: "server error", data: {api: "login", data: e.name}});
    }
}

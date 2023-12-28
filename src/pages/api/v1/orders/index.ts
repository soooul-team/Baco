import type {NextApiRequest, NextApiResponse} from 'next'
import {prisma} from "@/pages/api/utils/db/db_browser";
import "@/pages/api/utils/patch/bigint_patch";
import "@/pages/api/utils/generation/generator"
import Generator from "@/pages/api/utils/generation/generator";
import HttpCode from "@/pages/api/utils/http_code";
import StatusCode from "@/pages/api/utils/status_code";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const {method} = req;
    switch (method) {
        case "GET":
            await prisma.baco_orders.findMany({
                    where: {
                        status: {
                            not: 0
                        }
                    }
                }
            ).then((value: any) => {
                res.status(HttpCode.OK).json({code: HttpCode.OK, msg: "success", data: {data: value}});
            }).catch((reason: any) => {
                res.status(HttpCode.OK).json({code: 500, msg: "server error", data: {data: reason}});
            });
            break;
        case "POST":
            const {user_vid, address_vid, product_vid} = req.body;
            let new_view_id = Generator.viewIdGenerate();
            await prisma.baco_orders.create({
                data: {
                    view_id: new_view_id,
                    user_vid: `${user_vid}`,
                    address_vid: `${address_vid}`,
                    product_vid: `${product_vid}`,
                    status: StatusCode.NORMAL,
                }
            }).then((value: any) => {
                res.status(HttpCode.OK).json({code: HttpCode.OK, msg: "success", data: {data: value}});
            }).catch((reason: any) => {
                res.status(HttpCode.OK).json({code: 500, msg: "server error", data: {data: reason}});
            });
            break;
        default:
            res.setHeader("Allow", ["GET", "POST"]);
            res.status(HttpCode.OK).json({
                code: HttpCode.ERROR_REQUEST_METHOD_CODE,
                msg: HttpCode.ERROR_REQUEST_METHOD_MSG,
                data: {}
            });
            break;
    }
}
